import * as THREE from 'three'

export interface Material {
  id: ID,
  name: string,
  three: THREE.MeshStandardMaterial
}

// DuraPro ASA Neon Green
export const neonGreen: Material = {
  id: "neonGreen",
  name: "Neon Green",
  three: new THREE.MeshStandardMaterial({
    color: 0x00FF00,
    roughness: 0.4,
    metalness: 0.2
  })
}

// DuraPro ASA Neon Orange
export const neonOrange: Material = {
  id: "neonOrange",
  name: "Neon Orange",
  three: new THREE.MeshStandardMaterial({
    color: 0xFF8500, // Neon Orange
    roughness: 0.7,
    metalness: 0.1
  })
}

// DuraPro ASA Neon Pink
export const neonPink: Material = {
  id: "neonPink",
  name: "Neon Pink",
  three: new THREE.MeshStandardMaterial({
    color: 0xFF69B4,
    roughness: 0.4,
    metalness: 0.2
  })
}

// DuraPro ASA Neon Yellow
export const neonYellow: Material = {
  id: "neonYellow",
  name: "Neon Yellow",
  three: new THREE.MeshStandardMaterial({
    color: 0xDDFF00, // Neon Yellow
    roughness: 0.9,
    metalness: 0.05
  })
}

export const blue: Material = {
  id: "blue",
  name: "Blue",
  three: new THREE.MeshPhysicalMaterial({
    color: 0x1166dd, // Adjust the color based on your requirement
    metalness: 0.05,
    roughness: 0.8,
    reflectivity: 0.1,
    clearcoat: 0.0,
    clearcoatRoughness: 0.7
  })
}

export const red: Material = {
  id: "red",
  name: "Red",
  three: new THREE.MeshStandardMaterial({
    color: 0xff5555,
    roughness: 0.4,
    metalness: 0.2
  })
}

export const lightBlue: Material = {
  id: "lightBlue",
  name: "Light Blue",
  three: new THREE.MeshStandardMaterial({
    color: 0x66aaff,
    roughness: 0.4,
    metalness: 0.2
  })
}

export const turqoise: Material = {
  id: "turqoise",
  name: "Turqoise",
  three: new THREE.MeshStandardMaterial({
    color: 0x00FFFF,
    roughness: 0.4,
    metalness: 0.2
  })
}

export const purple: Material = {
  id: "purple",
  name: "Purple",
  three: new THREE.MeshStandardMaterial({
    color: 0x703A92,
    roughness: 0.4,
    metalness: 0.2
  })
}

export const white: Material = {
  id: "white",
  name: "White",
  three: new THREE.MeshStandardMaterial({
    color: 0xeeeeee, // White
    roughness: 0.4,
    metalness: 0.2
  })
}

export const black: Material = {
  id: "black",
  name: "Black",
  three: new THREE.MeshPhysicalMaterial({
    color: 0x444444,
    roughness: 0.8,
    metalness: 0.05,
    clearcoat: 0.0,
    clearcoatRoughness: 0.7
  })
}

export const materials: Material[] = [
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

export function findById(id: ID): Material {
  const material = materials.find(material => material.id === id)

  if (!material) {
    throw new Error(`Material not found: ${id}`)
  }

  return material
}