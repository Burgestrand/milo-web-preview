export const colorRoles = [
  "primary", "secondary", "tertiary", "accent", "tpu"
] as const

export type ColorRole = typeof colorRoles[number]

export const colorRoleTitles = new Map<string, string>([
  ["primary", "Primary"],
  ["secondary", "Secondary"],
  ["tertiary", "Tertiary"],
  ["accent", "Accent"],
  ["tpu", "TPU"],
])