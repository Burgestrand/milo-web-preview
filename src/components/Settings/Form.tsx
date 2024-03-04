import { useCallback } from 'react'
import { useStore } from '@nanostores/react'
import type { Color } from '@stores/settings'
import { colors as colorsStore, setColor } from '@stores/settings'
import type { ID as FilamentID } from '@config/filaments'
import { filaments, findById } from '@config/filaments'

const titles: Record<Color, string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  accent: "Accent",
  tpu: "TPU",
}

export default function Form() {
  const $colors = useStore(colorsStore)

  const handleColorChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const filament = findById(event.target.value as FilamentID)
    setColor(event.target.name as Color, filament)
  }, [])

  const style = {
    gridAutoColumns: 'minmax(0, 1fr)',
  }

  return (
    <form className="flex flex-row border-t-white py-2 px-4 gap-1">
      {Object.entries($colors).map(([name, filament]) => (
        <label key={name} style={style} className="flex flex-col place-items-center">
          <span className="">{titles[name]}</span>
          <select name={name} value={filament.id} onChange={handleColorChange} className="text-xs rounded-md">
            {filaments.map(({ id, name }) =>
              <option key={id} value={id}>{name}</option>
            )}
          </select>
        </label>
      ))}
    </form>
  )
}