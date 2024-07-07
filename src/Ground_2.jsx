import { useTexture } from '@react-three/drei';
import React, { useMemo, useEffect } from 'react';
import grassTexture from './assets/grass.jpg';
import { Noise } from 'noisejs';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import Cubes from './Cubes';
import useStore from './store'; // Correct import

const noise = new Noise();

const Ground_2 = () => {
	const grass = useTexture(grassTexture);
	const size = 30; // grid size
	const noiseScale = 0.1; // noise frequency
	const heightThreshold = 0.55; // height threshold
	const { setInstances } = useStore();

	const instancesMemo = useMemo(() => {
		const instancesArray = [];
		for (let x = 0; x < size; x++) {
			for (let z = 0; z < size; z++) {
				const noiseValue = noise.simplex2(x * noiseScale, z * noiseScale);
				const height = noiseValue > heightThreshold ? 1 : 0;
				instancesArray.push({
					key: `instance_${x}_${z}`,
					position: [x - size / 2, height, z - size / 2],
					rotation: [0, 0, 0],
				});
			}
		}
		return instancesArray;
	}, [size, noiseScale, heightThreshold]);

	useEffect(() => {
		setInstances(instancesMemo);
	}, [instancesMemo, setInstances]);

	return (
		<>
			<Cubes
				limit={30 * 30}
				instances={instancesMemo}
				texture={grass}
			/>

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
		</>
	);
};

export default Ground_2;
