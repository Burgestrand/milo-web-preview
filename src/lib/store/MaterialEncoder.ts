import type { PersistentEncoder } from '@nanostores/persistent'
import type { Material } from '@lib/materials'
import * as THREE from 'three'

import * as materials from "@lib/materials"

export default class MaterialEncoder implements PersistentEncoder<Material> {
  encode(value: Material | undefined) {
    return value && JSON.stringify(value)
  }

  decode(value: string | undefined): Material {
    if (value === undefined) return undefined;

    const loader = new THREE.MaterialLoader()
    const material = loader.parse(JSON.parse(value))
    return material
  }
}