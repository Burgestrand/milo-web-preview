export type Printable = {
  name: string,
  color: "primary" | "accent" | "tpu"
  stl?: string
}

const printables: Printable[] = []

// Spindle
printables.push({
  name: "Spindle_mount_80mm_part_A",
  stl: "STL Files/Minimill Main/Spindle Mount/[a] Spindle Mount 80mm Part A x1.stl",
  color: "accent"
})
printables.push({ name: "SMH_80mm_part_B_(1)", color: "primary" })
printables.push({ name: "Logo_insert", color: "primary" })

// X Axis
printables.push({ name: "X_axis_motor_mount", color: "primary" })
printables.push({ name: "X_axis_Bearing_Block", color: "primary" })
printables.push({ name: "X_axis_anti_backlash_Nut", color: "primary" })

// Y Axis
printables.push({ name: "Y_axis_bearing_block", color: "primary" })
printables.push({ name: "Y_axis_anti_backlash_nut", color: "primary" })
printables.push({ name: "Y_drag_chain_mount(Mirror)", color: "accent" })
printables.push({ name: "Y_axis_motor_mount_(1)", color: "primary" })

printables.push({ name: "XY_dragchain_transition", color: "accent" })

// Z Axis
printables.push({ name: "Z_Axis_bearing_block", color: "accent" })
printables.push({ name: "Z_axis_anti_backlash_nut", color: "primary" })
printables.push({ name: "Z_drag_chain_mount_B", color: "accent" })
printables.push({ name: "Z_drag_chain_mount_A_(1)", color: "accent" })
printables.push({ name: "Z_Wire_redirect_hook", color: "accent" })
printables.push({ name: "Z_axis_cable_chain_backer", color: "accent" })
printables.push({ name: "Z_axis_motor_mount_(1)", color: "primary" })
printables.push({ name: "Ballast_box", color: "primary" })
printables.push({ name: "Ballast_cap", color: "primary" })

// Table
printables.push({ name: "handwheel_handle_(1)_(1)", color: "primary" })
printables.push({ name: "handwheel_(1)", color: "primary" })
printables.push({ name: "handwheel_handle_(1)", color: "primary" })
printables.push({ name: "handwheel", color: "primary" })

printables.push({ name: "X_axis_Table_support_(Centres)_(1)", color: "primary" })
printables.push({ name: "X_axis_Table_support_(Centres)", color: "primary" })
printables.push({ name: "X_axis_Table_support_(ends)", color: "primary" })
printables.push({ name: "X_axis_Table_support_(ends)_(3)", color: "primary" })
printables.push({ name: "X_axis_Table_support_(ends)_(1)", color: "primary" })
printables.push({ name: "X_axis_Table_support_(ends)_(2)", color: "primary" })

// Misc
printables.push({ name: "Table_bolt_down_(2)", color: "accent" })
printables.push({ name: "table_Bolt_downs", color: "accent" })
printables.push({ name: "Table_bolt_down", color: "accent" })
printables.push({ name: "Table_bolt_down_(1)", color: "accent" })
printables.push({ name: "TPU_foot", color: "tpu" })
printables.push({ name: "TPU_foot_(1)", color: "tpu" })
printables.push({ name: "TPU_foot_(2)", color: "tpu" })
printables.push({ name: "TPU_foot_(3)", color: "tpu" })
printables.push({ name: "Skirt_front", color: "primary" })
printables.push({ name: "Skirt_Rear", color: "primary" })

// Electrical
printables.push({ name: "PSU_mounting_bracket", color: "primary" })
printables.push({ name: "PSU_mounting_bracket_(1)", color: "primary" })
printables.push({ name: "PSU_mounting_bracket_(1)_(1)", color: "primary" })
printables.push({ name: "Mainboard_mount", color: "primary" })
printables.push({ name: "Cable_channel_", color: "primary" })

export default printables