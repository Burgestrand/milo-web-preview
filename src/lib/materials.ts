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

register("anthracite", { name: "Anthracite", color: 0x45494c })
register("black", { name: "Black", color: 0x222222 })
register("grey", { name: "Grey", color: 0xaea89c })
register("lightBlue", { name: "Light Blue", color: 0x006db6 })
register("makitaBlue", { name: "Makita Blue", color: 0x00646f })
register("neonPink", { name: "Neon Pink", color: 0xe74589 })
register("orange", { name: "Orange", color: 0xff5900 })
register("purple", { name: "Purple", color: 0x82558b })
register("red", { name: "Red", color: 0xbf2532 })
register("silver", { name: "Silver", color: 0x65696b, metalness: 0.2, roughness: 0.4 })
register("steelBlue", { name: "Steel Blue", color: 0x304262 })
register("white", { name: "White", color: 0xe3e0d4 })
register("neonYellow", { name: "Neon Yellow", color: 0xdbf415 })
register("ratRigGreen", { name: "Rat Rig Green", color: 0x8fe106 })
register("popGreen", { name: "Pop Green", color: 0x3cee2a})
register("popPink", { name: "Pop Pink", color: 0xea4e8e})

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