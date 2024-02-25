import { map } from 'nanostores'
import type { Filament } from '@config/filaments'
import * as filaments from '@config/filaments'
import type { Printable } from '@config/printables'

export const colors = map<Record<Printable["color"], Filament>>({
  primary: filaments.blue,
  accent: filaments.neonYellow,
  tpu: filaments.neonPink
})
