import { useEffect, useState, useCallback } from "react"
import { useStore } from "@nanostores/react"

import { colorRoleTitles } from "@lib/config"

import printables, { instructions } from "@lib/printables"
import type { Instruction, Printable } from "@lib/printables"

import { colorRoleToMaterial, printableMaterialOverride, setPrintableMaterialOverride } from "@lib/store"

import type { ID as MaterialID } from '@lib/materials'
import { default as materials, findById, id } from "@lib/materials"

const printablesByInstruction = new Map<Instruction, Printable[]>()

printables.forEach((printable) => {
  const instruction = printable.instruction

  if (!printablesByInstruction.has(instruction)) {
    printablesByInstruction.set(instruction, [])
  }
  printablesByInstruction.get(instruction).push(printable)
})

printablesByInstruction.delete(instructions.hide)

function Color({ color }: { color: string }) {
  const $colorRoleToMaterial = useStore(colorRoleToMaterial)
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => { setHydrated(true) }, [])

  if (!hydrated) {
    return null
  }

  return (<span>({$colorRoleToMaterial[color].name})</span>)
}

function Printable({ printable }: { printable: Printable }) {
  const $printableMaterialOverride = useStore(printableMaterialOverride)
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => { setHydrated(true) }, [])

  const handleMaterialChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const materialId = event.target.value as MaterialID
    const material = materialId === "" ? undefined : findById(materialId)
    setPrintableMaterialOverride(printable.id, material)
  }, [printable.id])

  if (!hydrated) {
    return null
  }

  const material = $printableMaterialOverride[printable.id]
  const value = material && id(material)

  return (<li className="flex flex-row place-content-center place-items-end border-b">
    <span className="flex-grow">{printable.stl} (#{printable.id})</span>
    <select name={printable.id} value={value} onChange={handleMaterialChange} className="rounded-md text-sm py-1 px-2 bg-transparent text-white border-none">
      <option value="">(Default)</option>
      {Object.values(materials).map((material) => <option key={id(material)} value={id(material)}>{material.name}</option>)}
    </select>
  </li>)
}

function Section({ instruction, printables }: { instruction: Instruction, printables: Printable[] }) {
  const title = instruction.type === "hide" ? "Hide" : `Print: ${colorRoleTitles.get(instruction.color)}`
  const color = instruction.type === "hide" ? null : <Color color={instruction.color} />

  return (
    <section className="bg-shark-900 text-white rounded-lg py-2 px-4">
      <header>
        <h3 className="text-lg font-bold">{title} {color}</h3>
      </header>
      <ul className="flex flex-col gap-2">
        {Array.from(printables.values()).map((printable) =>
          <Printable key={printable.id} printable={printable} />
        )}
      </ul>
    </section>
  )
}

export default function Printables() {
  return Array.from(printablesByInstruction, ([instruction, printables], index) =>
    <Section key={index} instruction={instruction} printables={printables} />
  )
}