import type { PersistentEncoder } from '@nanostores/persistent'
import type { Filament } from '@config/filaments'

import * as filaments from "@config/filaments"

export default class FilamentEncoder implements PersistentEncoder<Filament> {
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