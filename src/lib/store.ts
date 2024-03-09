import { persistentMap, setPersistentEngine } from '@nanostores/persistent'
import { storage, events } from './store/URLPersistenceEngine'

setPersistentEngine(storage, events)

import type { Material } from '@lib/materials'
export type { Material }
import { default as materials } from '@lib/materials'

import type { ColorRole } from '@lib/config'
export type { ColorRole }

import MaterialEncoder from "./store/MaterialEncoder"

export const colorRoleToMaterial = persistentMap<Record<ColorRole, Material>>("color-roles:", {
  primary: materials.black,
  accent: materials.blue,
  tpu: materials.turqoise
}, new MaterialEncoder())

export function setColorRoleMaterial(color: ColorRole, material: Material) {
  colorRoleToMaterial.setKey(color, material)
}
