export const colorGroups = [
  "primary", "secondary", "tertiary", "accent", "tpu"
] as const

export type ColorRole = typeof colorGroups[number]