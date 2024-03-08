import { persistentMap } from '@nanostores/persistent'

import type { Filament } from '@config/filaments'
export type { Filament }
import * as filaments from '@config/filaments'

import type { ColorRole } from '@lib/config'
export type { ColorRole }

import FilamentEncoder from "./FilamentEncoder"

export const colors = persistentMap<Record<ColorRole, Filament>>("colors:", {
  primary: filaments.black,
  secondary: filaments.black,
  tertiary: filaments.black,
  accent: filaments.blue,
  tpu: filaments.turqoise
}, new FilamentEncoder())

export function setColorRoleFilament(color: ColorRole, filament: Filament) {
  colors.setKey(color, filament)
}
