import * as THREE from 'three'

export interface Filament {
  id: ID,
  name: string,
  material: THREE.MeshStandardMaterial
}

// DuraPro ASA Neon Green
export const neonGreen: Filament = {
  id: "neonGreen",
  name: "DuraPro ASA Neon Green",
  material: new THREE.MeshStandardMaterial({
    color: 0x00FF00,
    roughness: 0.4,
    metalness: 0.2,
    userData: { filament: "neonGreen" }
  })
}

// DuraPro ASA Neon Orange
export const neonOrange: Filament = {
  id: "neonOrange",
  name: "DuraPro ASA Neon Orange",
  material: new THREE.MeshPhysicalMaterial({
    color: 0xFFA500, // Neon Orange
    roughness: 0.4,
    metalness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    sheen: 0.5,
    userData: { filament: "neonOrange" }
  })
}

// DuraPro ASA Neon Pink
export const neonPink: Filament = {
  id: "neonPink",
  name: "DuraPro ASA Neon Pink",
  material: new THREE.MeshStandardMaterial({
    color: 0xFF69B4,
    roughness: 0.4,
    metalness: 0.2,
    userData: { filament: "neonPink" }
  })
}

// DuraPro ASA Neon Yellow
export const neonYellow: Filament = {
  id: "neonYellow",
  name: "DuraPro ASA Neon Yellow",
  material: new THREE.MeshPhysicalMaterial({
    color: 0xFFFF00, // Neon Yellow
    roughness: 0.4,
    metalness: 0.05,
    clearcoat: 0.0, // Adds a clear coat layer for additional sheen, typical for car paint or polished surfaces
    clearcoatRoughness: 0.5, // The roughness of the clear coat layer
    sheen: 0.5, // Simulates the sheen phenomenon of fabrics
    userData: { filament: "neonYellow" }
  })
}

export const blue: Filament = {
  id: "blue",
  name: "Generic Blue",
  material: new THREE.MeshPhysicalMaterial({
    color: 0x1166dd, // Adjust the color based on your requirement
    metalness: 0.05,
    roughness: 0.8,
    reflectivity: 0.1,
    clearcoat: 0.0,
    clearcoatRoughness: 0.7
  })
}

export const turqoise: Filament = {
  id: "turqoise",
  name: "Generic Turqoise",
  material: new THREE.MeshStandardMaterial({
    color: 0x00FFFF,
    roughness: 0.4,
    metalness: 0.2,
    userData: { filament: "turqoise" }
  })
}

export const white: Filament = {
  id: "white",
  name: "Generic White",
  material: new THREE.MeshStandardMaterial({
    color: 0xd0d0d0, // White
    roughness: 0.4,
    metalness: 0.2,
    userData: { filament: "white" }
  })
}

export const black: Filament = {
  id: "black",
  name: "Generic Black",
  material: new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    roughness: 0.8,
    metalness: 0.05,
    clearcoat: 0.0,
    clearcoatRoughness: 0.7,
    userData: { filament: "black" }
  })
}

export type ID =
  "turqoise" |
  "neonGreen" |
  "neonOrange" |
  "neonPink" |
  "neonYellow" |
  "blue" |
  "white" |
  "black"

export const filaments: Filament[] = [
  neonGreen,
  neonOrange,
  neonPink,
  neonYellow,
  blue,
  turqoise,
  white,
  black
]

export function findById(id: ID): Filament {
  const filament = filaments.find(filament => filament.id === id)

  if (!filament) {
    throw new Error(`Filament not found: ${id}`)
  }

  return filament
}