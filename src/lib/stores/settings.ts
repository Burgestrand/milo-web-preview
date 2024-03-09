import { persistentMap } from '@nanostores/persistent'

import type { Material } from '@lib/config/materials'
export type { Material }
import * as materials from '@lib/config/materials'

import type { ColorRole } from '@lib/config'
export type { ColorRole }

import MaterialEncoder from "./MaterialEncoder"

export const colors = persistentMap<Record<ColorRole, Material>>("colors:", {
  primary: materials.black,
  accent: materials.blue,
  tpu: materials.turqoise
}, new MaterialEncoder())

export function setColorRoleMaterial(color: ColorRole, material: Material) {
  colors.setKey(color, material)
}
