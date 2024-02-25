import { useCallback } from 'react'
import { useStore } from '@nanostores/react'
import { colors as colorsStore } from 'src/lib/stores/settings'
import { filaments } from 'src/lib/config/filaments'

function FilamentSelect(props) {
  return (
    <select {...props}>
      {filaments.map(({ id, name }) =>
        <option key={id} value={id}>{name}</option>
      )}
    </select>
  )
}

export default function Settings() {
  const $colors = useStore(colorsStore)

  const handleColorChange = useCallback((event) => {
    const filament = filaments.find(({ id }) => id === event.target.value)
    colorsStore.setKey(event.target.name, filament)
  }, [colorsStore])

  console.debug({ $colors })

  return (
    <form id="settings-form">
      {Object.entries($colors).map(([name, value]) => (
        <label key={name}>
          <span>{name}</span>
          <FilamentSelect name={name} value={value.id} onChange={handleColorChange} />
        </label>
      ))}
    </form>
  )
}