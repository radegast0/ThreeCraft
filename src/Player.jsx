import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier';

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export function Player() {
	const ref = useRef();
	const rapier = useRapier();
	const [, get] = useKeyboardControls();

	useFrame((state) => {
		const { forward, backward, left, right, jump } = get();
		const velocity = ref.current.linvel();

        // camera
        
        

		// Update direction based on keyboard input
		frontVector.set(0, 0, Number(backward) - Number(forward));
		sideVector.set(Number(left) - Number(right), 0, 0);
		direction
			.subVectors(frontVector, sideVector)
			.normalize()
			.multiplyScalar(SPEED);

		// Apply velocity to the RigidBody
		ref.current.setLinvel(
			{
				x: direction.x,
				y: velocity.y,
				z: direction.z,
			},
			true
		);

        

		if (jump && Math.abs(velocity.y) < 0.05) {
			ref.current.applyImpulse({ x: 0, y: 10, z: 0 });
		}
	});

	return (
		<RigidBody
			ref={ref}
			colliders={false}
			mass={1}
			type="dynamic"
			position={[0, 1, -3]}
			enabledRotations={[false, false, false]}
		>
			<CapsuleCollider args={[0.75, 0.5]} />
		</RigidBody>
	);
}
