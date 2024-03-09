import { useEffect, useState } from "react"
import { useStore } from "@nanostores/react"
import printables, { instructions } from "@lib/printables"
import { colorRoleTitles } from "@lib/config"
import type { Instruction, Printable } from "@lib/printables"
import { colorRoleToMaterial } from "@lib/store"

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

function Section({ instruction, printables }: { instruction: Instruction, printables: Printable[] }) {
  const title = instruction.type === "hide" ? "Hide" : `Print: ${colorRoleTitles.get(instruction.color)}`
  const color = instruction.type === "hide" ? null : <Color color={instruction.color} />
  const printablesByStl = new Map(Array.from(printables).map(printable => [printable.stl, printable]))

  return (
    <section className="bg-shark-900 text-white rounded-lg py-2 px-4">
      <header>
        <h3 className="text-lg font-bold">{title} {color}</h3>
      </header>
      <ul>
        {Array.from(printablesByStl.keys()).map(stl => <li key={stl} className="mt-1">{stl}</li>)}
      </ul>
    </section>
  )
}

export default function Printables() {
  return Array.from(printablesByInstruction, ([instruction, printables], index) =>
    <Section key={index} instruction={instruction} printables={printables} />
  )
}