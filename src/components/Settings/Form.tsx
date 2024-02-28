import { useCallback } from 'react'
import { useStore } from '@nanostores/react'
import { colors as colorsStore } from '@stores/settings'
import { filaments } from '@config/filaments'

function FilamentSelect(props) {
  console.debug(props, filaments)
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
  console.debug($colors)

  const handleColorChange = useCallback((event) => {
    colorsStore.setKey(event.target.name, event.target.value)
  }, [colorsStore])

  return (
    <form id="settings-form">
      {Object.entries($colors).map(([name, value]) => (
        <label key={name}>
          <span>{name}</span>
          <FilamentSelect name={name} value={value} onChange={handleColorChange} />
        </label>
      ))}
    </form>
  )
}