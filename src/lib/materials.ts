import * as THREE from 'three'

export type Material = THREE.Material
export type ID = string

const materials: Record<ID, Material> = Object.assign(Object.create(null), {
  neonGreen: new THREE.MeshStandardMaterial({
    name: "Neon Green",
    color: 0x00FF00,
    roughness: 0.4,
    metalness: 0.2,
    userData: { id: "neonGreen" }
  }),
  neonOrange: new THREE.MeshStandardMaterial({
    name: "Neon Orange",
    color: 0xFF8500,
    roughness: 0.7,
    metalness: 0.1,
    userData: { id: "neonOrange", }
  }),
  neonPink: new THREE.MeshStandardMaterial({
    name: "Neon Pink",
    color: 0xFF69B4,
    roughness: 0.4,
    metalness: 0.2,
    userData: { id: "neonPink" }
  }),
  neonYellow: new THREE.MeshStandardMaterial({
    name: "Neon Yellow",
    color: 0xDDFF00,
    roughness: 0.9,
    metalness: 0.05,
    userData: { id: "neonYellow" }
  }),
  blue: new THREE.MeshPhysicalMaterial({
    name: "Blue",
    color: 0x1166dd,
    metalness: 0.05,
    roughness: 0.8,
    reflectivity: 0.1,
    clearcoat: 0.0,
    clearcoatRoughness: 0.7,
    userData: { id: "blue" }
  }),
  red: new THREE.MeshStandardMaterial({
    name: "Red",
    color: 0xff5555,
    roughness: 0.4,
    metalness: 0.2,
    userData: { id: "red" }
  }),
  lightBlue: new THREE.MeshStandardMaterial({
    name: "Light Blue",
    color: 0x66aaff,
    roughness: 0.4,
    metalness: 0.2,
    userData: { id: "lightBlue" }
  }),
  turqoise: new THREE.MeshStandardMaterial({
    name: "Turqoise",
    color: 0x00FFFF,
    roughness: 0.4,
    metalness: 0.2,
    userData: { id: "turqoise" }
  }),
  purple: new THREE.MeshStandardMaterial({
    name: "Purple",
    color: 0x703A92,
    roughness: 0.4,
    metalness: 0.2,
    userData: { id: "purple" }
  }),
  white: new THREE.MeshStandardMaterial({
    name: "White",
    color: 0xeeeeee,
    roughness: 0.4,
    metalness: 0.2,
    userData: { id: "white" }
  }),
  black: new THREE.MeshPhysicalMaterial({
    name: "Black",
    color: 0x444444,
    roughness: 0.8,
    metalness: 0.05,
    clearcoat: 0.0,
    clearcoatRoughness: 0.7,
    userData: { id: "black" }
  })
})

export default materials

export function id(material: Material): ID {
  return material.userData.id
}

export function findById(id: ID): Material {
  if (!(id in materials)) {
    throw new Error(`Material not found: ${id}`)
  }

  return materials[id]
}