import type { ColorRole } from "@lib/config"
import { digest } from "@lib/util"

export type Instruction =
  { type: "print", color: ColorRole } |
  { type: "hide" }

export type ObjectPath = [NodeName, ...PathSegment[]]
export type NodeName = string
export type PathSegment = NodeName

export type Printable = {
  id: string

  // A single thing might have multiple model paths, e.g. a mirrored part.
  path: ObjectPath

  // Not strictly needed, but makes it easier to double-check.
  stl: string

  instruction: Instruction
}

export const instructions: {
  hide: Instruction
  print: Record<ColorRole, Instruction>
} = {
  hide: { type: "hide" } as Instruction,
  print: {
    primary: { type: "print", color: "primary" },
    accent: { type: "print", color: "accent" },
    tpu: { type: "print", color: "tpu" }
  }
}

const printables = new Map<string, Printable>()

function push(printable: Omit<Printable, "id">) {
  // Generate ID based on STL and path.
  const unique = printable.stl + "@" + printable.path.join("/")
  const id = digest(unique)

  if (printables.has(id))
    throw new Error("Duplicate printable ID: " + digest)

  printables.set(id, { id, ...printable })
}

// 65mm Spindle
push({
  path: ["Spindle_mount_65mm_part_A_(1)"],
  stl: "Minimill Main/Spindle Mount/[a] Spindle Mount 65mm Part A x1.stl",
  instruction: instructions.hide
})
push({
  path: ["SMH_65mm_part_B"],
  stl: "Minimill Main/Spindle Mount/[a] Spindle Mount 65mm Part B x1.stl",
  instruction: instructions.hide
})

// Spindle
push({ path: ["Spindle_mount_80mm_part_A"], instruction: instructions.print.accent, stl: "Minimill Main/Spindle Mount/[a] Spindle Mount 80mm Part A x1.stl" })
push({ path: ["SMH_80mm_part_B_(1)"], instruction: instructions.print.primary, stl: "Minimill Main/Spindle Mount/Spindle Mount 80mm Part B x1.stl" })
push({ path: ["Logo_insert"], instruction: instructions.print.primary, stl: "Minimill Main/Spindle Mount/Logo Insert x1.stl" });

// X Axis
((instruction: Instruction) => {
  push({ path: ["X_axis_motor_mount", "SOLID014"], instruction, stl: "Minimill Main/X Axis STLs/X Axis Motor Mount x1.stl" })
  push({ path: ["X_axis_Bearing_Block", "SOLID015"], instruction, stl: "Minimill Main/X Axis STLs/X Axis Bearing Block x1.stl" })
  push({ path: ["X_axis_anti_backlash_Nut", "SOLID023"], instruction, stl: "Minimill Main/X Axis STLs/X Axis Anti Backlash Nut x1.stl" });
})(instructions.print.primary);

// Y Axis
((instruction: Instruction) => {
  push({ path: ["Y_axis_bearing_block", "SOLID"], instruction, stl: "Minimill Main/Y Axis STLs/Y Axis Bearing Block x1.stl" })
  push({ path: ["Y_axis_anti_backlash_nut", "SOLID002"], instruction, stl: "Minimill Main/Y Axis STLs/Y Axis Anti Backlash Nut x1.stl" })
  push({ path: ["Y_axis_motor_mount_(1)", "SOLID006"], instruction, stl: "Minimill Main/Y Axis STLs/Y Axis Motor Mount x1.stl" })
  push({ path: ["Y_drag_chain_mount(Mirror)", "SOLID003"], instruction: instructions.print.accent, stl: "Minimill Main/Cable Chain Mounts/[a] Y Drag Chain Mount x1.stl" })
  push({ path: ["XY_dragchain_transition", "SOLID004"], instruction: instructions.print.accent, stl: "Minimill Main/Cable Chain Mounts/[a] XY Drag Chain Transition x1.stl" });
})(instructions.print.primary);

// Z Axis
((instruction: Instruction) => {
  push({ path: ["Z_axis_motor_mount_(1)", "SOLID030"], instruction, stl: "Minimill Main/Z Axis STLs/Z Motor Mount x1.stl" })
  push({ path: ["Z_Axis_bearing_block", "SOLID024"], instruction: instructions.print.accent, stl: "Minimill Main/Z Axis STLs/[a] Z Axis Bearing Block x1.stl" })
  push({ path: ["Z_axis_anti_backlash_nut", "SOLID026"], instruction, stl: "Minimill Main/Z Axis STLs/Z Axis Anti Backlash Nut x1.stl" })
  push({ path: ["Ballast_box", "SOLID007"], instruction, stl: "Minimill Main/Main Column/Ballast Box x1.stl" })
  push({ path: ["Ballast_cap"], instruction, stl: "Minimill Main/Main Column/Ballast Cap x1.stl" });
})(instructions.print.primary);

// Column Plates, not needed for LDO.
((instruction: Instruction) => {
  push({ path: ["Joining_plate_A_mirror", "SOLID011"], instruction, stl: "Minimill Main/Main Column/Column Plate A Mirror x1.stl" })
  push({ path: ["Joining_plate_A", "SOLID009"], instruction, stl: "Minimill Main/Main Column/Column Plate A x1.stl" })
  push({ path: ["Joining_plate_B_mirror", "SOLID012"], instruction, stl: "Minimill Main/Main Column/Column Plate B Mirror x1.stl" })
  push({ path: ["Joining_plate_B", "SOLID008"], instruction, stl: "Minimill Main/Main Column/Column Plate B x1.stl" })
  push({ path: ["Joining_plate_C_mirror", "SOLID013"], instruction, stl: "Minimill Main/Main Column/Column Plate C Mirror x1.stl" })
  push({ path: ["Joining_plate_C", "SOLID010"], instruction, stl: "Minimill Main/Main Column/Column Plate C x1.stl" })
  push({ path: ["Z_reinforcement_bracket", "COMPOUND022", "COMPOUND020"], instruction, stl: "Minimill Main/Main Column/Z Reinforcement Bracket x1.stl" });
  push({ path: ["Z_reinforcement_bracket", "COMPOUND022", "COMPOUND021"], instruction, stl: "Minimill Main/Main Column/Z Reinforcement Bracket Mirror x1.stl" });
})(instructions.print.primary);

((instruction: Instruction) => {
push({ path: ["Z_drag_chain_mount_B"], instruction, stl: "Minimill Main/Cable Chain Mounts/[a] Z Drag Chain Mount B x1.stl" })
push({ path: ["Z_drag_chain_mount_A_(1)", "SOLID027"], instruction, stl: "Minimill Main/Cable Chain Mounts/[a] Z Drag Chain Mount A x1.stl" })
push({ path: ["Z_Wire_redirect_hook", "SOLID028"], instruction, stl: "Minimill Main/Cable Chain Mounts/[a] Z Cable Redirect Hook x1.stl" })
push({ path: ["Z_axis_cable_chain_backer", "SOLID029"], instruction, stl: "Minimill Main/Cable Chain Mounts/[a} Z Axis Cable Chain Backer x1.stl" });
})(instructions.print.accent);

// Table
((printable: Omit<Printable, "path" | "id" | "id">) => {
  push({ path: ["handwheel_handle_(1)_(1)"], ...printable })
  push({ path: ["handwheel_handle_(1)"], ...printable })
})({ stl: "Minimill Main/Hand Wheels/Handwheel Handle x2.stl", instruction: instructions.print.primary });

((printable: Omit<Printable, "path" | "id">) => {
  push({ path: ["handwheel_(1)", "SOLID005"], ...printable });
  push({ path: ["handwheel", "SOLID016"], ...printable });
})({ stl: "Minimill Main/Hand Wheels/Handwheel Body x2 .stl", instruction: instructions.print.primary });

((printable: Omit<Printable, "path" | "id">) => {
  push({ path: ["X_axis_Table_support_(Centres)_(1)", "SOLID017"], ...printable })
  push({ path: ["X_axis_Table_support_(Centres)", "SOLID018"], ...printable })
})({ stl: "Minimill Main/X Axis STLs/X Axis Table Support Centre x2 .stl", instruction: instructions.print.primary });

((printable: Omit<Printable, "path" | "id">) => {
  push({ path: ["X_axis_Table_support_(ends)", "SOLID019"], ...printable })
  push({ path: ["X_axis_Table_support_(ends)_(3)", "SOLID020"], ...printable })
  push({ path: ["X_axis_Table_support_(ends)_(1)", "SOLID021"], ...printable })
  push({ path: ["X_axis_Table_support_(ends)_(2)", "SOLID022"], ...printable })
})({ stl: "Minimill Main/X Axis STLs/X Axis Table Support Ends x4 .stl", instruction: instructions.print.primary });

// Misc
((printable: Omit<Printable, "path" | "id">) => {
  push({ path: ["Table_bolt_down_(2)", "SOLID039"], ...printable })
  push({ path: ["Table_bolt_down", "SOLID041"], ...printable })
})({ stl: "Electronics Table/[a] Table Bolt Down Bracket B x2.stl", instruction: instructions.print.accent });

((printable: Omit<Printable, "path" | "id">) => {
  push({ path: ["table_Bolt_downs", "SOLID040"], ...printable })
  push({ path: ["Table_bolt_down_(1)", "SOLID042"], ...printable })
})({ stl: "Electronics Table/[a] Table Bolt Down Bracket A x2.stl", instruction: instructions.print.accent });

((stl: Printable["stl"]) => {
  push({ path: ["TPU_foot", "SOLID043"], instruction: instructions.print.tpu, stl });
  push({ path: ["TPU_foot001", "SOLID044"], instruction: instructions.print.tpu, stl });
  push({ path: ["TPU_foot002", "SOLID045"], instruction: instructions.print.tpu, stl });
  push({ path: ["TPU_foot003", "SOLID046"], instruction: instructions.print.tpu, stl });
})("Electronics Table/TPU Feet x4.stl");

((instruction: Instruction) => {
  push({ path: ["Skirt_front", "COMPOUND031", "COMPOUND029"], instruction, stl: "Electronics Table/Skirt Front A Solid x1.stl" })
  push({ path: ["Skirt_front", "COMPOUND031", "COMPOUND030"], instruction, stl: "Electronics Table/Skirt Front B E-Stop x1.stl" })
})(instructions.print.primary);

((instruction: Instruction) => {
  push({ path: ["Skirt_Rear", "COMPOUND034", "COMPOUND032"], instruction, stl: "Electronics Table/Rear Skirt A x1.stl" })
  push({ path: ["Skirt_Rear", "COMPOUND034", "COMPOUND033"], instruction, stl: "Electronics Table/Rear Skirt B x1.stl" })
})(instructions.print.primary);

// Electrical
push({ path: ["PSU_mounting_bracket_(1)_(1)"], instruction: instructions.print.primary, stl: "Electronics Table/PSU Mounting Bracket A x2.stl" });

((printable: Omit<Printable, "path" | "id">) => {
push({ path: ["PSU_mounting_bracket"], ...printable })
push({ path: ["PSU_mounting_bracket_(1)"], ...printable })
})({ stl: "Electronics Table/PSU Mounting Bracket B x2.stl", instruction: instructions.print.primary });

push({ path: ["Mainboard_mount", "SOLID048"], instruction: instructions.print.primary, stl: "Electronics Table/Mainboard Mount x1.stl" })
push({ path: ["Cable_channel_", "SOLID049"], instruction: instructions.print.primary, stl: "Electronics Table/Cable Channel x1.stl" })
// Electronics Table/Cable Channel Cover x1.stl

export default printables