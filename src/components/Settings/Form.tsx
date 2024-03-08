import { useCallback, useEffect, useState } from 'react'
import { useStore } from '@nanostores/react'
import type { ColorRole } from '@lib/config'
import { colorGroups } from '@lib/config'
import { colors as colorsStore, setColorGroup } from '@stores/settings'
import type { ID as FilamentID } from '@config/filaments'
import { filaments, findById } from '@config/filaments'

const titles: Record<ColorRole, string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  accent: "Accent",
  tpu: "TPU",
}

function Select({ name, ...props }) {
  return (
    <label className="flex flex-col place-items-center">
      <span className="text-white font-semibold lowercase" style={{ fontVariantCaps: "small-caps" }}>{titles[name]}</span>
      <select {...props} className="text-xs rounded-md text-black" />
    </label>
  )
}

function Hydrated() {
  const $colors = useStore(colorsStore)

  const handleColorChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const filament = findById(event.target.value as FilamentID)
    setColorGroup(event.target.name as ColorRole, filament)
  }, [])

  const $colorGroups = colorGroups.map((ColorRole) => ({ ColorRole, filament: $colors[ColorRole] }))

  return $colorGroups.map(({ ColorRole, filament }) => (
    <Select key={ColorRole} name={ColorRole} value={filament.id} onChange={handleColorChange}>
      {filaments.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
    </Select>
  ))
}

function Hydrating() {
  return colorGroups.map((ColorRole) => (
    <Select key={ColorRole} name={ColorRole} disabled>
      <option>Loading...</option>
    </Select>
  ))
}

export default function Form() {
  // Before client rendering our $colors are incorrect.
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => { setHydrated(true) }, [])

  return (
    <form className="flex flex-row flex-wrap justify-around py-2 px-4 gap-2">
      {hydrated ? <Hydrated /> : <Hydrating />}
    </form>
  )
}