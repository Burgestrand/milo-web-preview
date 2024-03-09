import { persistentMap } from '@nanostores/persistent'

import type { Material } from '@lib/materials'
export type { Material }
import * as materials from '@lib/materials'

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
