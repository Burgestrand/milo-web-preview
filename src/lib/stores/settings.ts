import type { PersistentEncoder } from '@nanostores/persistent'
import { persistentMap } from '@nanostores/persistent'

import type { Filament } from '@config/filaments'
import * as filaments from '@config/filaments'
import type { Printable } from '@config/printables'

export type ColorSetting = Record<Printable["color"], Filament["id"]>

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

export const colors = persistentMap<ColorSetting>("colors:", {
  primary: "black",
  accent: "blue",
  tpu: "turqoise"
}, new FilamentEncoder())
