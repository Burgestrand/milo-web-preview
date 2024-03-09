import { useCallback, useEffect, useState } from 'react'
import { useStore } from '@nanostores/react'
import type { ColorRole } from '@lib/config'
import { colorRoles, colorRoleTitles } from '@lib/config'
import { colorRoleToMaterial, setColorRoleMaterial } from '@lib/store'
import type { ID as MaterialID } from '@lib/materials'
import { default as materials, findById, id } from '@lib/materials'

function Select({ name, ...props }) {
  return (
    <label className="flex-grow items-stretch flex flex-col">
      <span className="text-white font-semibold lowercase self-center" style={{ fontVariantCaps: "small-caps" }}>{colorRoleTitles.get(name)}</span>
      <select name={name} {...props} className="text-xs rounded-md text-black" />
    </label>
  )
}

function Hydrated() {
  const $colorRoleToMaterial = useStore(colorRoleToMaterial)

  const handleColorChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const material = findById(event.target.value as MaterialID)
    setColorRoleMaterial(event.target.name as ColorRole, material)
  }, [])

  return colorRoles.map((colorRole) => (
    <Select key={colorRole} name={colorRole} value={id($colorRoleToMaterial[colorRole])} onChange={handleColorChange}>
      {Object.values(materials).map((material) => <option key={id(material)} value={id(material)}>{material.name}</option>)}
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
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => { setHydrated(true) }, [])

  return (
    <form className="bg-accent text-on-accent flex flex-row flex-wrap justify-around gap-2 py-2 px-4 pb-4 border-4 border-shark-800">
      {hydrated ? <Hydrated /> : <Hydrating />}
    </form>
  )
}