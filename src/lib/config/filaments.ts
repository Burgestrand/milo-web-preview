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
  material: new THREE.MeshStandardMaterial({
    color: 0xFF8500, // Neon Orange
    roughness: 0.7,
    metalness: 0.1,
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
  material: new THREE.MeshStandardMaterial({
    color: 0xDDFF00, // Neon Yellow
    roughness: 0.9,
    metalness: 0.05,
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

export const red: Filament = {
  id: "red",
  name: "Generic Red",
  material: new THREE.MeshStandardMaterial({
    color: 0xff5555,
    roughness: 0.4,
    metalness: 0.2,
    userData: { filament: "red" }
  })
}

export const lightBlue: Filament = {
  id: "lightBlue",
  name: "Generic Light Blue",
  material: new THREE.MeshStandardMaterial({
    color: 0x66aaff,
    roughness: 0.4,
    metalness: 0.2,
    userData: { filament: "lightBlue" }
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

export const purple: Filament = {
  id: "purple",
  name: "Generic Purple",
  material: new THREE.MeshStandardMaterial({
    color: 0x703A92,
    roughness: 0.4,
    metalness: 0.2,
    userData: { filament: "purple" }
  })
}

export const white: Filament = {
  id: "white",
  name: "Generic White",
  material: new THREE.MeshStandardMaterial({
    color: 0xeeeeee, // White
    roughness: 0.4,
    metalness: 0.2,
    userData: { filament: "white" }
  })
}

export const black: Filament = {
  id: "black",
  name: "Generic Black",
  material: new THREE.MeshPhysicalMaterial({
    color: 0x444444,
    roughness: 0.8,
    metalness: 0.05,
    clearcoat: 0.0,
    clearcoatRoughness: 0.7,
    userData: { filament: "black" }
  })
}

export const filaments: Filament[] = [
  neonGreen,
  neonOrange,
  neonPink,
  neonYellow,
  blue,
  turqoise,
  white,
  black,
  purple,
  lightBlue,
  red
]

// TODO: Automatic
export type ID =
  "turqoise" |
  "neonGreen" |
  "neonOrange" |
  "neonPink" |
  "neonYellow" |
  "blue" |
  "white" |
  "purple" |
  "lightBlue" |
  "red" |
  "black"

export function findById(id: ID): Filament {
  const filament = filaments.find(filament => filament.id === id)

  if (!filament) {
    throw new Error(`Filament not found: ${id}`)
  }

  return filament
}