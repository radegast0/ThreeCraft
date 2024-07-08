import { useTexture } from '@react-three/drei';
import {
	CuboidCollider,
	InstancedRigidBodies,
	RigidBody,
} from '@react-three/rapier';
import React, { useMemo } from 'react';
import grassTexture from './assets/grass2.jpg';
import { Noise } from 'noisejs';

const Ground = () => {
	const grass = useTexture(grassTexture);

	const size = 30;
	const noiseScale = 0.1; // terrain smoothness
	const heightThreshold = 0.3; // the division point for heights

	const noise = useMemo(() => new Noise(Math.random()), []);

	const instances = useMemo(() => {
		const instances = [];
		for (let x = 0; x < size; x++) {
			for (let z = 0; z < size; z++) {
				const noiseValue = noise.simplex2(x * noiseScale, z * noiseScale);
				// Snap height to two levels based on the threshold
				const height = noiseValue > heightThreshold ? 1 : 0;
				instances.push({
					key: `instance_${x}_${z}`,
					position: [x - size / 2, height, z - size / 2],
					rotation: [0, 0, 0],
				});
			}
		}

		return instances;
	}, [size, noise, noiseScale, heightThreshold]);

	return (
		<>
			<RigidBody type="fixed">
				{/**Back */}
				<CuboidCollider
					args={[size / 2, 10, 0.5]}
					position={[-0.5, 0, size / 2]}
				/>
				{/**Right */}
				<CuboidCollider
					args={[0.5, 10, size / 2]}
					position={[size / 2, 0, -0.5]}
				/>
				{/**Front */}
				<CuboidCollider
					args={[size / 2, 10, 0.5]}
					position={[-0.5, 0, -size / 2 - 1]}
				/>
				{/**Left */}
				<CuboidCollider
					args={[0.5, 10, size / 2]}
					position={[-size / 2 - 1, 0, -0.5]}
				/>
			</RigidBody>

			<InstancedRigidBodies
				type="fixed"
				instances={instances}
			>
				<instancedMesh
					frustumCulled={false}
					castShadow
					args={[null, null, size * size]}
				>
					<boxGeometry />
					<meshStandardMaterial map={grass} />
				</instancedMesh>
			</InstancedRigidBodies>
		</>
	);
};

export default Ground;
