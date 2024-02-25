import { map } from 'nanostores'
import type { Filament } from 'src/lib/config/filaments'
import * as filaments from 'src/lib/config/filaments'
import type { Printable } from 'src/lib/config/printables'

export const colors = map<Record<Printable["color"], Filament>>({
  primary: filaments.blue,
  accent: filaments.neonYellow,
  tpu: filaments.neonPink
})
