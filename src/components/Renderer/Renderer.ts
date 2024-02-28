import * as THREE from 'three'
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

import type { Printable } from '@config/printables'
import printables from '@config/printables'
import { colors as colorStore } from '@stores/settings.ts'
import * as filaments from '@config/filaments'

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
    const gltf = await this.#load(this.model)
    console.debug(gltf)
    console.timeEnd(timer)

    gltf.scene.traverse(function(object) {
      if (((object as THREE.Mesh).isMesh)) {
          const mesh = object as THREE.Mesh
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

          materials.forEach((material: THREE.Material) => {
            (Object.keys(material) as (keyof THREE.Material)[]).forEach((key) => {
                const value = material[key];
                if (value && value instanceof THREE.Texture) {
                    value.encoding = THREE.sRGBEncoding;
                    console.debug(mesh, material)
                }
            });
          })
        }
    })

    const printablesByName = new Map(printables.map(printable => [printable.name, printable]))
    const nodesByPrintable = new Map(printables.map(printable => [printable, []]))

    const model = gltf.scene

    // Find all nodes for each printable.
    console.time("Finding nodes for printables")
    model.traverse((node) => {
      const printable = printablesByName.get(node.name)
      if (printable === undefined) {
        return
      }

      nodesByPrintable.get(printable).push(node)
    })
    console.timeEnd("Finding nodes for printables")

    // Double-check 1-to-1 mapping of printables to nodes.
    nodesByPrintable.forEach((nodes, printable) => {
      if (nodes.length === 0) {
        console.warn(`No nodes found for ${printable.name}`)
      } else if (nodes.length > 1) {
        console.warn(`Multiple nodes found for ${printable.name}`)
      }
    })

    console.time("Painting all printables")
    const nodesByColor = [...nodesByPrintable.entries()].reduce((map, [printable, newNodes]) => {
      const color = printable.color
      const nodes = map.get(color) || []
      map.set(color, nodes.concat(newNodes))
      return map
    }, new Map<Printable["color"], THREE.Object3D[]>())

    colorStore.subscribe((colorToFilament) => {
      nodesByColor.forEach((nodes, color) => {
        const filament = colorToFilament[color]

        nodes.forEach((node) => {
          node.children.forEach((child) => {
            if (child.isMesh) {
              child.material = filament.material
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