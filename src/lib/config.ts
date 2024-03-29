export const colorRoles = ["primary", "accent", "tpu"] as const

export type ColorRole = typeof colorRoles[number]

export const colorRoleTitles = new Map<ColorRole, string>([
  ["primary", "Primary"],
  ["accent", "Accent"],
  ["tpu", "TPU"],
])