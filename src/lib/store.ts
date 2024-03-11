import { persistentMap, setPersistentEngine } from '@nanostores/persistent'
import { storage, events } from './store/URLPersistenceEngine'

setPersistentEngine(storage, events)

import type { Material } from '@lib/materials'
export type { Material }
import { default as materials } from '@lib/materials'

import type { ColorRole } from '@lib/config'
export type { ColorRole }

import MaterialEncoder from "./store/MaterialEncoder"

export const colorRoleToMaterial = {
  store: persistentMap<Record<ColorRole, Material>>("color-roles:", {
    primary: materials.black,
    accent: materials.red,
    tpu: materials.black
  }, new MaterialEncoder()),

  set(role: ColorRole, material: Material) {
    this.store.setKey(role, material)
  },

  get(colorRole: ColorRole): Material {
    return this.store.get()[colorRole] ?? materials.white
  }
}

export const printableMaterialOverride = {
  store: persistentMap<Record<string, Material>>("printable-material-override:", {}, new MaterialEncoder()),
  set(id: string, material: Material | undefined) {
    return this.store.setKey(id, material)
  },
  get(id: string): Material | undefined {
    return this.store.get()[id]
  }
}
