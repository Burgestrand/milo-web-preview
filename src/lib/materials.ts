import * as THREE from 'three'

export type Material = THREE.MeshPhysicalMaterial
export type ID = string

const materials: Record<ID, Material> = Object.create(null)

type MaterialParameters = THREE.MeshPhysicalMaterialParameters
type RegisterMaterial = MaterialParameters
                      & Required<Pick<MaterialParameters, "name" | "color">>

function register(id: ID, params: RegisterMaterial) {
  params.roughness ??= 0.8
  params.metalness ??= 0
  params.envMapIntensity ??= 1
  params.userData ??= Object.create(null)
  params.userData.id = id

  materials[id] = new THREE.MeshPhysicalMaterial(params)
}

register("anthracite", { name: "Anthracite", color: 0x373e42 })
register("black", { name: "Black", color: 0x333333 })
register("grey", { name: "Grey", color: 0xb4b4b4 })
register("lightBlue", { name: "Light Blue", color: 0x4993ff })
register("makitaBlue", { name: "Makita Blue", color: 0x3e8ea5 })
register("neonPink", { name: "Neon Pink", color: 0xFF69B4 })
register("orange", { name: "Orange", color: 0xfe7700 })
register("purple", { name: "Purple", color: 0x783fa4 })
register("red", { name: "Red", color: 0xd22b37 })
register("silver", { name: "Silver", color: 0xb0b3bc, metalness: 0.2, roughness: 0.4 })
register("steelBlue", { name: "Steel Blue", color: 0x3c5c97 })
register("white", { name: "White", color: 0xf3f0e9 })
register("neonYellow", { name: "Neon Yellow", color: 0xf3fe00 })
register("ratRigGreen", { name: "Rat Rig Green", color: 0xa7fa00 })

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