import { useCallback } from 'react'
import { useStore } from '@nanostores/react'
import type { Color } from '@stores/settings'
import { colors as colorsStore, setColor } from '@stores/settings'
import type { ID as FilamentID } from '@config/filaments'
import { filaments, findById } from '@config/filaments'

export default function Form() {
  const $colors = useStore(colorsStore)

  const handleColorChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const filament = findById(event.target.value as FilamentID)
    setColor(event.target.name as Color, filament)
  }, [])

  return (
    <form id="settings-form">
      {Object.entries($colors).map(([name, filament]) => (
        <label key={name}>
          <span>{name} ({filament.id})</span>
          <select name={name} value={filament.id} onChange={handleColorChange}>
            {filaments.map(({ id, name }) =>
              <option key={id} value={id}>{name}</option>
            )}
          </select>
        </label>
      ))}
    </form>
  )
}