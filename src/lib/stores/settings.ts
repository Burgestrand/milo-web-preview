import type { PersistentEncoder } from '@nanostores/persistent'
import { persistentMap } from '@nanostores/persistent'

import type { Filament } from '@config/filaments'
import * as filaments from '@config/filaments'
import type { Printable } from '@config/printables'

export type { Filament }
export type Color = Printable["color"]

class FilamentEncoder implements PersistentEncoder<Filament> {
  encode(value: Filament) {
    return value.id
  }

  decode(value: string) {
    try {
      return filaments.findById(value as Filament["id"])
    } catch (error) {
      console.error("FilamentEncoder#decode", value, error)
      return filaments.white
    }
  }
}

export const colors = persistentMap<Record<Color, Filament>>("colors:", {
  primary: filaments.black,
  accent: filaments.blue,
  tpu: filaments.turqoise
}, new FilamentEncoder())

export function setColor(color: Color, filament: Filament) {
  colors.setKey(color, filament)
}
