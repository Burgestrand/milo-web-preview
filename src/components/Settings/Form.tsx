import { useCallback, useEffect, useState } from 'react'
import { useStore } from '@nanostores/react'
import type { ColorRole } from '@lib/config'
import { colorRoles, colorRoleTitles } from '@lib/config'
import { colors as colorsStore, setColorRoleMaterial } from '@stores/settings'
import type { ID as MaterialID } from '@lib/config/materials'
import { materials, findById } from '@lib/config/materials'

function Select({ name, ...props }) {
  return (
    <label className="flex-grow items-stretch flex flex-col">
      <span className="text-white font-semibold lowercase self-center" style={{ fontVariantCaps: "small-caps" }}>{colorRoleTitles.get(name)}</span>
      <select name={name} {...props} className="text-xs rounded-md text-black" />
    </label>
  )
}

function Hydrated() {
  const $colors = useStore(colorsStore)

  const handleColorChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const material = findById(event.target.value as MaterialID)
    setColorRoleMaterial(event.target.name as ColorRole, material)
  }, [])

  const $colorRoles = colorRoles.map((colorRole) => ({ colorRole, material: $colors[colorRole] }))

  return $colorRoles.map(({ colorRole, material }) => (
    <Select key={colorRole} name={colorRole} value={material.id} onChange={handleColorChange}>
      {materials.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
    </Select>
  ))
}

function Hydrating() {
  return colorRoles.map((colorRole) => (
    <Select key={colorRole} name={colorRole} disabled>
      <option>Loading...</option>
    </Select>
  ))
}

export default function Form() {
  // Before client rendering our $colors are incorrect.
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => { setHydrated(true) }, [])

  return (
    <form className="bg-accent text-on-accent flex flex-row flex-wrap justify-around gap-2 py-2 px-4 pb-4 border-4 border-shark-800">
      {hydrated ? <Hydrated /> : <Hydrating />}
    </form>
  )
}