import { persistentMap } from '@nanostores/persistent'

import type { Filament } from '@config/filaments'
export type { Filament }
import * as filaments from '@config/filaments'

import type { Color } from '@config/printables'
export type { Color }

import FilamentEncoder from "./FilamentEncoder"

export const colors = persistentMap<Record<Color, Filament>>("colors:", {
  primary: filaments.black,
  secondary: filaments.black,
  tertiary: filaments.black,
  accent: filaments.blue,
  tpu: filaments.turqoise
}, new FilamentEncoder())

export function setColor(color: Color, filament: Filament) {
  colors.setKey(color, filament)
}
