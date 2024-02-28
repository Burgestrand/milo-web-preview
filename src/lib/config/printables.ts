type Color = "primary" | "accent" | "tpu"

export type Printable = {
  friendly_name?: string,
  group?: string,
  name: string,
  color: Color
  stl: string
}

const printables: Printable[] = []

// Spindle
printables.push({
  name: "Spindle_mount_80mm_part_A",
  stl: "STL Files/Minimill Main/Spindle Mount/[a] Spindle Mount 80mm Part A x1.stl",
  color: "accent"
})
printables.push({ name: "SMH_80mm_part_B_(1)", color: "primary", stl: "STL Files/Minimill Main/Spindle Mount/Spindle Mount 80mm Part B x1.stl" })
printables.push({ name: "Logo_insert", color: "primary", stl: "STL Files/Minimill Main/Spindle Mount/Logo Insert x1.stl" })

// TODO: Hide these in the model?
// STL Files/Minimill Main/Spindle Mount/[a] Spindle Mount 65mm Part A x1.stl
// STL Files/Minimill Main/Spindle Mount/Spindle Mount 65mm Part B x1.stl

// X Axis
printables.push({ name: "X_axis_motor_mount", color: "primary", stl: "STL Files/Minimill Main/X Axis STLs/X Axis Motor Mount x1.stl" })
printables.push({ name: "X_axis_Bearing_Block", color: "primary", stl: "STL Files/Minimill Main/X Axis STLs/X Axis Bearing Block x1.stl" })
printables.push({ name: "X_axis_anti_backlash_Nut", color: "primary", stl: "STL Files/Minimill Main/X Axis STLs/X Axis Anti Backlash Nut x1.stl" })

// Y Axis
printables.push({ name: "Y_axis_bearing_block", color: "primary", stl: "STL Files/Minimill Main/Y Axis STLs/Y Axis Bearing Block x1.stl" })
printables.push({ name: "Y_axis_anti_backlash_nut", color: "primary", stl: "STL Files/Minimill Main/Y Axis STLs/Y Axis Anti Backlash Nut x1.stl" })
printables.push({ name: "Y_axis_motor_mount_(1)", color: "primary", stl: "STL Files/Minimill Main/Y Axis STLs/Y Axis Motor Mount x1.stl" })

printables.push({ name: "Y_drag_chain_mount(Mirror)", color: "accent", stl: "STL Files/Minimill Main/Cable Chain Mounts/[a] Y Drag Chain Mount x1.stl" })
printables.push({ name: "XY_dragchain_transition", color: "accent", stl: "STL Files/Minimill Main/Cable Chain Mounts/[a] XY Drag Chain Transition x1.stl" })

// Z Axis
printables.push({ name: "Z_axis_motor_mount_(1)", color: "primary", stl: "STL Files/Minimill Main/Z Axis STLs/Z Motor Mount x1.stl" })
printables.push({ name: "Z_Axis_bearing_block", color: "accent", stl: "STL Files/Minimill Main/Z Axis STLs/[a] Z Axis Bearing Block x1.stl" })
printables.push({ name: "Z_axis_anti_backlash_nut", color: "primary", stl: "STL Files/Minimill Main/Z Axis STLs/Z Axis Anti Backlash Nut x1.stl" })
printables.push({ name: "Ballast_box", color: "primary", stl: "STL Files/Minimill Main/Main Column/Ballast Box x1.stl" })
printables.push({ name: "Ballast_cap", color: "primary", stl: "STL Files/Minimill Main/Main Column/Ballast Cap x1.stl" })

// TODO: Find these
// STL Files/Minimill Main/Main Column/Column Plate A x1.stl
// STL Files/Minimill Main/Main Column/Column Plate A Mirror x1.stl
// STL Files/Minimill Main/Main Column/Column Plate B x1.stl
// STL Files/Minimill Main/Main Column/Column Plate B Mirror x1.stl
// STL Files/Minimill Main/Main Column/Column Plate C x1.stl
// STL Files/Minimill Main/Main Column/Column Plate C Mirror x1.stl
// STL Files/Minimill Main/Main Column/Z Reinforcement Bracket x1.stl
// STL Files/Minimill Main/Main Column/Z Reinforcement Bracket Mirror x1.stl

printables.push({ name: "Z_drag_chain_mount_B", color: "accent", stl: "STL Files/Minimill Main/Cable Chain Mounts/[a] Z Drag Chain Mount B x1.stl" })
printables.push({ name: "Z_drag_chain_mount_A_(1)", color: "accent", stl: "STL Files/Minimill Main/Cable Chain Mounts/[a] Z Drag Chain Mount A x1.stl" })
printables.push({ name: "Z_Wire_redirect_hook", color: "accent", stl: "STL Files/Minimill Main/Cable Chain Mounts/[a] Z Cable Redirect Hook x1.stl" })
printables.push({ name: "Z_axis_cable_chain_backer", color: "accent", stl: "STL Files/Minimill Main/Cable Chain Mounts/[a} Z Axis Cable Chain Backer x1.stl" });

// Table
((stl: string, color: Color) => {
  printables.push({ name: "handwheel_handle_(1)_(1)", color, stl })
  printables.push({ name: "handwheel_handle_(1)", color, stl })
})("STL Files/Minimill Main/Hand Wheels/Handwheel Handle x2.stl", "primary");

((stl: string, color: Color) => {
  printables.push({ name: "handwheel_(1)", color, stl })
  printables.push({ name: "handwheel", color, stl });
})("STL Files/Minimill Main/Hand Wheels/Handwheel Body x2 .stl", "primary");

((stl: string, color: Color) => {
  printables.push({ name: "X_axis_Table_support_(Centres)_(1)", stl, color })
  printables.push({ name: "X_axis_Table_support_(Centres)", stl, color })
})("STL Files/Minimill Main/X Axis STLs/X Axis Table Support Centre x2 .stl", "primary");

((stl: string, color: Color) => {
  printables.push({ name: "X_axis_Table_support_(ends)", stl, color })
  printables.push({ name: "X_axis_Table_support_(ends)_(3)", stl, color })
  printables.push({ name: "X_axis_Table_support_(ends)_(1)", stl, color })
  printables.push({ name: "X_axis_Table_support_(ends)_(2)", stl, color })
})("STL Files/Minimill Main/X Axis STLs/X Axis Table Support Ends x4 .stl", "primary");

// Misc
((stl: string, color: Color) => {
  printables.push({ name: "Table_bolt_down_(2)", color, stl })
  printables.push({ name: "Table_bolt_down", color: "primary", stl })
})("STL Files/Electronics Table/[a] Table Bolt Down Bracket B x2.stl", "accent");

((stl: string, color: Color) => {
  printables.push({ name: "table_Bolt_downs", color, stl })
  printables.push({ name: "Table_bolt_down_(1)", color, stl })
})("STL Files/Electronics Table/[a] Table Bolt Down Bracket A x2.stl", "accent");

((stl: string, color: Color) => {
  printables.push({ name: "TPU_foot", color, stl })
  printables.push({ name: "TPU_foot_(1)", color, stl })
  printables.push({ name: "TPU_foot_(2)", color, stl })
  printables.push({ name: "TPU_foot_(3)", color, stl })
})("STL Files/Electronics Table/TPU Feet x4.stl", "tpu");

printables.push({ name: "Skirt_front", color: "primary", stl: "STL Files/Electronics Table/Skirt Front A Solid x1.stl" })
// STL Files/Electronics Table/Skirt Front A Solid x1.stl
// STL Files/Electronics Table/Skirt Front B E-Stop x1.stl

printables.push({ name: "Skirt_Rear", color: "primary", stl: "STL Files/Electronics Table/Rear Skirt A x1.stl" })
// STL Files/Electronics Table/Rear Skirt A x1.stl
// STL Files/Electronics Table/Rear Skirt B x1.stl

// Electrical
printables.push({ name: "PSU_mounting_bracket_(1)_(1)", color: "primary", stl: "STL Files/Electronics Table/PSU Mounting Bracket A x2.stl" });
// STL Files/Electronics Table/PSU Mounting Bracket A x2.stl

((stl: string, color: Color) => {
printables.push({ name: "PSU_mounting_bracket", stl, color })
printables.push({ name: "PSU_mounting_bracket_(1)", stl, color })
})("STL Files/Electronics Table/PSU Mounting Bracket B x2.stl", "primary");

printables.push({ name: "Mainboard_mount", color: "primary", stl: "STL Files/Electronics Table/Mainboard Mount x1.stl" })
printables.push({ name: "Cable_channel_", color: "primary", stl: "STL Files/Electronics Table/Cable Channel x1.stl" })
// STL Files/Electronics Table/Cable Channel Cover x1.stl

export default printables