export const colorRoles = [
  "primary", "secondary", "tertiary", "accent", "tpu"
] as const

export type ColorRole = typeof colorRoles[number]