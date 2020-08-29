import React, { useRef } from 'react'
import * as THREE from 'three'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useLoader(GLTFLoader, '/scene.gltf')

  const meshes = Object.keys(nodes).filter(name => name.startsWith('mesh')).map(name => <instancedMesh key={name} args={[nodes[name].geometry, nodes[name].material, 10]} />);
  console.log(meshes)
  return meshes
  
  // return (
  //   <group ref={group} {...props} dispose={null}>
  //     <mesh material={materials.Rose} geometry={nodes.mesh_0.geometry} />
  //     <mesh material={materials.Rose} geometry={nodes.mesh_1.geometry} />
  //     <mesh material={materials.Liquid_rose} geometry={nodes.mesh_2.geometry} />
  //     <mesh material={materials.Rose} geometry={nodes.mesh_3.geometry} />
  //     <mesh material={materials.Rose} geometry={nodes.mesh_4.geometry} />

  //     {/* <group rotation={[-Math.PI / 2, 0, 0]}>
  //       <group position={[32.42, 0.03, 30.92]} rotation={[0, 0, -1.03]} scale={[1, 1, 1]}>
  //         <group position={[-16.76, -27.75, -30.92]} rotation={[0, 0, 1.03]} scale={[1, 1, 1]}>
  //           <mesh material={materials.Orange} geometry={nodes.mesh_5.geometry} />
  //         </group>
  //       </group>
  //       <group position={[32.42, 0.03, 30.92]} rotation={[0, 0, -1.03]} scale={[1, 1, 1]}>
  //         <group position={[-16.76, -27.75, -30.92]} rotation={[0, 0, 1.03]} scale={[1, 1, 1]}>
  //           <mesh material={materials.Liquid_orange} geometry={nodes.mesh_6.geometry} />
  //         </group>
  //       </group>
  //       <group position={[32.42, 0.03, 30.92]} rotation={[0, 0, -1.03]} scale={[1, 1, 1]}>
  //         <group position={[-16.76, -27.75, -30.92]} rotation={[0, 0, 1.03]} scale={[1, 1, 1]}>
  //           <mesh material={materials.Juice_Grapefruit} geometry={nodes.mesh_7.geometry} />
  //         </group>
  //       </group>
  //       <group position={[32.42, 0.03, 30.92]} rotation={[0, 0, -1.03]} scale={[1, 1, 1]}>
  //         <group position={[-16.76, -27.75, -30.92]} rotation={[0, 0, 1.03]} scale={[1, 1, 1]}>
  //           <mesh material={materials.Liquid_orange} geometry={nodes.mesh_8.geometry} />
  //         </group>
  //       </group>
  //       <group position={[32.42, 0.03, 30.92]} rotation={[0, 0, -1.03]} scale={[1, 1, 1]}>
  //         <group position={[-16.76, -27.75, -30.92]} rotation={[0, 0, 1.03]} scale={[1, 1, 1]}>
  //           <mesh material={materials.Orange} geometry={nodes.mesh_9.geometry} />
  //         </group>
  //       </group>
  //     </group>

  //     <group rotation={[-Math.PI / 2, 0, 0]}>
  //       <group position={[32.4, -0.03, 61.02]} rotation={[0, 0, 0.16]} scale={[1, 1, 1]}>
  //         <group position={[-32, 5.09, -61.03]} rotation={[0, 0, -0.16]} scale={[1, 1, 1]}>
  //           <mesh material={materials.Blue} geometry={nodes.mesh_10.geometry} />
  //         </group>
  //       </group>
  //       <group position={[32.4, -0.03, 61.02]} rotation={[0, 0, 0.16]} scale={[1, 1, 1]}>
  //         <group position={[-32, 5.09, -61.03]} rotation={[0, 0, -0.16]} scale={[1, 1, 1]}>
  //           <mesh material={materials.Blue} geometry={nodes.mesh_11.geometry} />
  //         </group>
  //       </group>
  //       <group position={[32.4, -0.03, 61.02]} rotation={[0, 0, 0.16]} scale={[1, 1, 1]}>
  //         <group position={[-32, 5.09, -61.03]} rotation={[0, 0, -0.16]} scale={[1, 1, 1]}>
  //           <mesh material={materials.BlueCherry} geometry={nodes.mesh_12.geometry} />
  //         </group>
  //       </group>
  //       <group position={[32.4, -0.03, 61.02]} rotation={[0, 0, 0.16]} scale={[1, 1, 1]}>
  //         <group position={[-32, 5.09, -61.03]} rotation={[0, 0, -0.16]} scale={[1, 1, 1]}>
  //           <mesh material={materials.Blue} geometry={nodes.mesh_13.geometry} />
  //         </group>
  //       </group>
  //       <group position={[32.4, -0.03, 61.02]} rotation={[0, 0, 0.16]} scale={[1, 1, 1]}>
  //         <group position={[-32, 5.09, -61.03]} rotation={[0, 0, -0.16]} scale={[1, 1, 1]}>
  //           <mesh material={materials.Blue} geometry={nodes.mesh_14.geometry} />
  //         </group>
  //       </group>
  //     </group>

  //     <group rotation={[-Math.PI / 2, 0, 0]}>
  //       <group position={[-32.43, 0.01, 61.49]} rotation={[0, 0, -2.94]}>
  //         <group position={[-31.78, 6.48, -61.49]} rotation={[0, 0, 2.94]}>
  //           <mesh material={materials.coffee} geometry={nodes.mesh_15.geometry} />
  //         </group>
  //       </group>
  //       <group position={[-32.43, 0.01, 61.49]} rotation={[0, 0, -2.94]}>
  //         <group position={[-31.78, 6.48, -61.49]} rotation={[0, 0, 2.94]}>
  //           <mesh material={materials.Liquid_coffee} geometry={nodes.mesh_16.geometry} />
  //         </group>
  //       </group>
  //       <group position={[-32.43, 0.01, 61.49]} rotation={[0, 0, -2.94]}>
  //         <group position={[-31.78, 6.48, -61.49]} rotation={[0, 0, 2.94]}>
  //           <mesh material={materials.coffee2} geometry={nodes.mesh_17.geometry} />
  //         </group>
  //       </group>
  //       <group position={[-32.43, 0.01, 61.49]} rotation={[0, 0, -2.94]}>
  //         <group position={[-31.78, 6.48, -61.49]} rotation={[0, 0, 2.94]}>
  //           <mesh material={materials.Liquid_coffee} geometry={nodes.mesh_18.geometry} />
  //         </group>
  //       </group>
  //       <group position={[-32.43, 0.01, 61.49]} rotation={[0, 0, -2.94]}>
  //         <group position={[-31.78, 6.48, -61.49]} rotation={[0, 0, 2.94]}>
  //           <mesh material={materials.coffee} geometry={nodes.mesh_19.geometry} />
  //         </group>
  //       </group>
  //     </group>

  //     <group rotation={[-Math.PI / 2, 0, 0]}>
  //       <group position={[-32.47, -0.06, 0.76]} rotation={[0, 0, Math.PI / 2]}>
  //         <group position={[0.06, -32.47, -0.76]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 1, 1]}>
  //           <mesh material={materials.Liquid_Chocolate} geometry={nodes.mesh_25.geometry} />
  //         </group>
  //       </group>
  //       <group position={[-32.47, -0.06, 0.76]} rotation={[0, 0, Math.PI / 2]}>
  //         <group position={[0.06, -32.47, -0.76]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 1, 1]}>
  //           <mesh material={materials['Chocolate-2']} geometry={nodes.mesh_26.geometry} />
  //         </group>
  //       </group>
  //       <group position={[-32.47, -0.06, 0.76]} rotation={[0, 0, Math.PI / 2]}>
  //         <group position={[0.06, -32.47, -0.76]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 1, 1]}>
  //           <mesh material={materials['Corona_14_-_Defa']} geometry={nodes.mesh_27.geometry} />
  //         </group>
  //       </group>
  //       <group position={[-32.47, -0.06, 0.76]} rotation={[0, 0, Math.PI / 2]}>
  //         <group position={[0.06, -32.47, -0.76]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 1, 1]}>
  //           <mesh material={materials['Chocolate-2']} geometry={nodes.mesh_28.geometry} />
  //         </group>
  //       </group>
  //       <group position={[-32.47, -0.06, 0.76]} rotation={[0, 0, Math.PI / 2]}>
  //         <group position={[0.06, -32.47, -0.76]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 1, 1]}>
  //           <mesh material={materials.Liquid_Chocolate} geometry={nodes.mesh_29.geometry} />
  //         </group>
  //       </group>
  //     </group> */}

  //   </group>
  // )
}
