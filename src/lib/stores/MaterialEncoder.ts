import type { PersistentEncoder } from '@nanostores/persistent'
import type { Material } from '@lib/config/materials'

import * as materials from "@lib/config/materials"

export default class MaterialEncoder implements PersistentEncoder<Material> {
  encode(value: Material) {
    return value.id
  }

  decode(value: string) {
    try {
      return materials.findById(value as Material["id"])
    } catch (error) {
      return materials.white
    }
  }
}