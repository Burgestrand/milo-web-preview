import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

import type { GLTF } from 'three/addons/loaders/GLTFLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MeshoptDecoder } from "meshoptimizer"

import type { ObjectPath } from '@lib/printables'
import type { Printable } from '@lib/printables'
import printables from '@lib/printables'
import { colorRoleToMaterial, printableMaterialOverride } from '@lib/store'

export type RendererProgressEvent = CustomEvent<ProgressEvent>

export default class Renderer {
  model: string
  renderer: THREE.WebGLRenderer
  controls: OrbitControls
  resizeObserver: ResizeObserver

  camera = new THREE.PerspectiveCamera(75, 1, 0.01, 1000)
  scene = new THREE.Scene()
  loader = new GLTFLoader()

  constructor({ model, canvas }) {
    this.loader.setMeshoptDecoder(MeshoptDecoder)

    this.model = model
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    })
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.camera.position.z = 0.4
    this.camera.position.y = 0.4
    this.camera.position.x = 0.4

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.addEventListener('change', this.#render)

    this.resizeObserver = new ResizeObserver(this.resized)
    this.resizeObserver.observe(canvas)
  }

  resized = ([entry]) => {
    const { width, height } = entry.contentRect
    this.renderer.setSize(width, height, false)

    const aspectRatio = width / height
    this.camera.aspect = aspectRatio
    this.camera.updateProjectionMatrix()
  }

  #dig(root: THREE.Object3D, path: ObjectPath) {
    return path.slice(1).reduce((nodes, segment): THREE.Object3D[] =>
      nodes.flatMap(node => node.children.filter(node => node.name === segment))
  , [root])
  }

  async start() {
    console.group("Renderer#start")
    const { renderer, scene } = this

    this.#lighting()

    const timer = `Loading ${this.model}...`
    console.time(timer)
    const gltf = await this.#load(this.model, (event) => {
      const customEvent: RendererProgressEvent = new CustomEvent("custom:progress", { detail: event })
      renderer.domElement.dispatchEvent(customEvent)
    })
    renderer.domElement.dispatchEvent(new CustomEvent("custom:loaded", { detail: null }))
    console.timeEnd(timer)

    const printablesByRoot = Array.from(printables.values()).reduce((tree, printable) => {
      const name = printable.path[0]
      const list = tree.get(name) || []
      list.push(printable)
      return tree.set(name, list)
    }, new Map<string, Printable[]>())
    const nodesByPrintable = new Map(Array.from(printables.values()).map(printable => [printable, []]))

    const model = gltf.scene
    // Rotate 90 degrees around the X axis.
    model.rotation.x = Math.PI / 2

    // Find all nodes for each printable.
    console.time("Finding nodes for printables")
    model.traverseVisible((node) => {
      const candidates = printablesByRoot.get(node.name)
      if (candidates === undefined) {
        return
      }

      const matches = candidates.flatMap((printable) => {
        const leaves = this.#dig(node, printable.path)
        if (leaves.length !== 1) console.warn("Weird leaves", printable, leaves)

        return { printable, nodes: leaves }
      })

      if (matches.length === 0) {
        console.error(`No matches found for ${node.name}`, node, candidates)
      }

      matches.forEach(({ printable, nodes }) => {
        nodesByPrintable.get(printable).push(...nodes)
      })
    })
    console.timeEnd("Finding nodes for printables")

    // Double-check 1-to-1 mapping of printables to nodes.
    nodesByPrintable.forEach((nodes, printable) => {
      if (nodes.length === 0) {
        console.warn(`No nodes found for ${printable.path}`)
      } else if (nodes.length > 1) {
        console.warn(`Multiple nodes found for ${printable.path}`)
      }
    })

    function repaint() {
      console.time("Repainting")

      printables.forEach((printable) => {
        const nodes = nodesByPrintable.get(printable)

        if (printable.instruction.type === "hide") {
          nodes.forEach(node => node.visible = false)
        } else if (printable.instruction.type === "print") {
          const nodes = nodesByPrintable.get(printable)
          const materialOverride = printableMaterialOverride.get(printable.id)
          const materialFromRole = colorRoleToMaterial.get(printable.instruction.color)
          const material = materialOverride || materialFromRole
          material.envMap = scene.environment

          const painted = nodes.flatMap(node => this.#paint(node, material))
          if (painted.length !== 1) console.warn("Painting anomaly", printable, nodes, painted)
        }
      })
      console.timeEnd("Repainting")
    }

    let scheduled = undefined
    let scheduleRepaint = () => {
      scheduled ??= globalThis.requestAnimationFrame(() => {
        repaint.call(this)
        scheduled = undefined
      })
    }

    console.time("Painting all overrides")
    colorRoleToMaterial.store.subscribe(scheduleRepaint)
    printableMaterialOverride.store.subscribe(scheduleRepaint)
    console.timeEnd("Painting all overrides")

    console.time("Compiling model")
    await this.renderer.compileAsync(model, this.camera, this.scene)
    console.timeEnd("Compiling model")

    this.scene.add(model)
    this.#lookAt(model)

    console.groupEnd()
    this.#animate()
  }

  #lookAt(model) {
    const box = new THREE.Box3().setFromObject(model)
    box.getCenter(this.controls.target)
    this.controls.target.y *= 0.5
    this.controls.update()
  }

  #animate = () => {
    globalThis.requestAnimationFrame(this.#animate);
    this.#render()
  }

  #render = () => {
    this.renderer.render(this.scene, this.camera)
  }

  #lighting() {
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1

    const environment = new RoomEnvironment(this.renderer)
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    const texture = pmremGenerator.fromScene(environment).texture
    this.scene.environment = texture
    this.scene.background = new THREE.Color(0xAAAAAA)
  }

  #paint(node, material) {
    const meshes: THREE.Mesh[] = node.getObjectsByProperty("type", "Mesh")
    meshes.forEach(mesh => {
      mesh.material = material
      material.envMap = this.scene.environment
      material.needsUpdate = true
    })
    return meshes
  }

  #load(model: string, onProgress?: (event: ProgressEvent) => void): Promise<GLTF> {
    return new Promise((resolve, reject) => {
      this.loader.load(model, resolve, onProgress, reject)
    })
  }
}