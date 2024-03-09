import * as THREE from 'three'
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

import type { ColorRole } from "@lib/config"
import type { Printable } from '@config/printables'
import printables from '@config/printables'
import { colors as colorStore } from '@stores/settings.ts'

export type RendererProgressEvent = CustomEvent<ProgressEvent>

export default class Renderer {
  model: string
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  resizeObserver: ResizeObserver

  constructor({ model, canvas }) {
    this.model = model
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    })
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 0.5

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    this.camera.position.z = 0.5
    this.camera.position.y = 0.5
    this.camera.position.x = 0.5
    this.camera.lookAt(0, 0, 0)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.addEventListener('change', this.#render)
    this.controls.target.set(0, 0, 0)

    this.resizeObserver = new ResizeObserver(this.resized)
    this.resizeObserver.observe(canvas)
  }

  resized = ([entry]) => {
    const { width, height } = entry.contentRect
    this.renderer.setSize(width, height)

    const aspectRatio = width / height
    this.camera.aspect = aspectRatio
    this.camera.updateProjectionMatrix()
  }

  #dig(root, path) {
    return path.slice(1).reduce((nodes, segment) =>
      nodes.flatMap(node => node.children.filter(node => node.name === segment))
  , [root])
  }

  async start() {
    console.group("Renderer#start")
    const { renderer, scene } = this

    const environment = new RoomEnvironment(renderer)
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    scene.environment = pmremGenerator.fromScene(environment).texture

    // Add a grid
    const grid = new THREE.GridHelper(100, 100, 0x0000ff, 0x808080)
    grid.position.y = -0.1
    scene.add(grid)

    const timer = `Loading ${this.model}...`
    console.time(timer)
    const gltf = await this.#load(this.model, (event) => {
      const customEvent: RendererProgressEvent = new CustomEvent("custom:progress", { detail: event })
      renderer.domElement.dispatchEvent(customEvent)
    })
    renderer.domElement.dispatchEvent(new CustomEvent("custom:loaded", { detail: null }))
    console.debug(gltf)
    console.timeEnd(timer)

    const printablesByRoot = printables.reduce((tree, printable) => {
      const segment = printable.path[0]
      const list = tree.get(segment) || []
      list.push(printable)
      return tree.set(segment, list)
    }, new Map<string, Printable[]>())
    const nodesByPrintable = new Map(printables.map(printable => [printable, []]))

    const model = gltf.scene

    // Find all nodes for each printable.
    console.time("Finding nodes for printables")
    model.traverseVisible((node) => {
      const candidates = printablesByRoot.get(node.name)
      if (candidates === undefined) {
        return
      }

      const nodes = candidates.flatMap((printable) => {
        const leaves = this.#dig(node, printable.path)
        if (leaves.length !== 1) console.warn("Weird leaves", printable, leaves)

        return { printable, nodes: leaves }
      })

      if (nodes.length === 0) {
        console.error(`No matches found for ${node.name}`, candidates, node)
      } else if (nodes.length > 1) {
        console.warn(`Multiple matches found for ${node.name}`, candidates, node, nodes)
      }

      nodes.forEach(({ printable, nodes }) => {
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

    console.time("Following all instructions")
    const nodesByColorRole = new Map<ColorRole, THREE.Object3D[]>()
    for (const [printable, nodes] of nodesByPrintable.entries()) {
      switch (printable.instruction.type) {
        case "hide":
          nodes.forEach(node => node.visible = false)
          break
        case "print":
            // no-op
          const color = printable.instruction.color
          const stored = nodesByColorRole.get(color) || []
          nodesByColorRole.set(color, stored.concat(nodes))
          break
      }
    }
    console.timeEnd("Following all instructions")

    console.time("Painting all printables")
    colorStore.subscribe((colorRoleToFilament) => {
      nodesByColorRole.forEach((nodes, colorRole) => {
        const filament = colorRoleToFilament[colorRole]

        nodes.forEach((node) => {
          node.children.forEach((child) => {
            if (child.type === "Mesh") {
              const mesh = child as THREE.Mesh
              mesh.material = filament.material
            }
          })
        })
      })
    })
    console.timeEnd("Painting all printables")

    console.time("Compiling model")
    await this.renderer.compileAsync(model, this.camera, this.scene)
    console.timeEnd("Compiling model")

    this.scene.add(model)

    console.groupEnd()
    this.#animate()
  }

  #animate = () => {
    globalThis.requestAnimationFrame(this.#animate);
    this.#render()
  }

  #render = () => {
    this.renderer.render(this.scene, this.camera)
  }

  #load(model: string, onProgress?: (event: ProgressEvent) => void): Promise<GLTF> {
    return new Promise((resolve, reject) => {
      new GLTFLoader().load(model, resolve, onProgress, reject)
    })
  }
}