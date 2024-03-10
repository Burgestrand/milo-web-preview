import type { PersistentEncoder } from '@nanostores/persistent'
import type { Material } from '@lib/materials'
import * as THREE from 'three'

const params = ["type", "name", "color", "roughness", "metalness", "envMapIntensity", "userData"] as const

export default class MaterialEncoder implements PersistentEncoder<Material> {
  encode(value: Material | undefined): string | null {
    const encoded = value && (() => {
      const data = params.reduce((obj, param) => {
        if (param in value) obj[param] = value[param]
        return obj
      }, Object.create(null))
      return JSON.stringify(data)
    })()
    return encoded
  }

  decode(value: string | undefined): Material | undefined {
    const decoded = value && ((): Material => {
      try {
        const object = JSON.parse(value)
        const material = THREE.MaterialLoader.createMaterialFromType(object.type)
        material.setValues(object)
        return material as Material
      } catch (e) {
        console.error("MaterialEncoder#decode", e)
        return undefined
      }
    })()
    return decoded
  }
}