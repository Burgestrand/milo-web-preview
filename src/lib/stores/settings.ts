import type { PersistentEncoder } from '@nanostores/persistent'
import { persistentMap } from '@nanostores/persistent'

import type { Filament } from '@config/filaments'
import * as filaments from '@config/filaments'
import type { Printable } from '@config/printables'

export type { Filament }
export type { Color } from '@config/printables'

class FilamentEncoder implements PersistentEncoder<Filament> {
  encode(value: Filament) {
    return value.id
  }

  decode(value: string) {
    try {
      return filaments.findById(value as Filament["id"])
    } catch (error) {
      return filaments.white
    }
  }
}

export const printables = persistentMap<Record<Printable, Filament>>("printables:", {})

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
