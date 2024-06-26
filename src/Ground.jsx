import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import grass from './assets/grass.jpg';

export default function Ground(props) {
	const texture = useTexture(grass);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	return (
		<RigidBody
			{...props}
			type="fixed"
			colliders={false}
			
		>
			<mesh
				receiveShadow
				position={[0, 0, 0]}
				rotation={[-Math.PI / 2, 0, 0]}
			>
				<planeGeometry args={[100, 100]} />
				<meshStandardMaterial
					map={texture}
					map-repeat={[100, 100]}
					color="green"
				/>
			</mesh>
			<CuboidCollider
				args={[100, 2, 100]}
				position={[0, -2, 0]}
			/>
		</RigidBody>
	);
}
