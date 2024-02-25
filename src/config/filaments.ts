import * as THREE from 'three'

export type Filament = {
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
    color: 0xFFA500,
    roughness: 0.4,
    metalness: 0.2,
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
    color: 0xFFFF00,
    roughness: 0.4,
    metalness: 0.2,
    userData: { filament: "neonYellow" }
  })
}

export const blue: Filament = {
  id: "blue",
  name: "Generic Blue",
  material: new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    roughness: 0.4,
    metalness: 0.2,
    userData: { filament: "blue" }
  })
}

export const white: Filament = {
  id: "white",
  name: "Generic White",
  material: new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.4,
    metalness: 0.2,
    userData: { filament: "white" }
  })
}

export const black: Filament = {
  id: "black",
  name: "Generic Black",
  material: new THREE.MeshStandardMaterial({
    color: 0x444444,
    roughness: 0.4,
    metalness: 0.2,
    userData: { filament: "black" }
  })
}

export type ID =
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
  white,
  black
]