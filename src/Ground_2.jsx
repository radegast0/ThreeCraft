import { Instance, Instances, useTexture } from '@react-three/drei';
import React, { useMemo, useRef } from 'react';
import grassTexture from './assets/grass2.jpg';
import dirtTexture from './assets/dirt.jpg';
import { Noise } from 'noisejs';
import { InstancedRigidBodies } from '@react-three/rapier';

const noise = new Noise();

const Ground_2 = () => {
	const instanceRef = useRef();
	const grass = useTexture(grassTexture);
	const dirt = useTexture(dirtTexture);
	const size = 30; // 20x0 grid size
	const noiseScale = 0.1; // adjust this value to change the noise frequency
	const heightThreshold = 0.4; // adjust this value to change the height threshold

	const instances = useMemo(() => {
		const instances = [];
		for (let x = 0; x < size; x++) {
			for (let z = 0; z < size; z++) {
				const noiseValue = noise.simplex2(x * noiseScale, z * noiseScale);
				const height = noiseValue > heightThreshold ? 1 : 0;
				instances.push({
					key: `instance_${x}_${z}`,
					position: [x - size / 2, height, z - size / 2],
					rotation: [0, 0, 0],
				});
			}
		}
		return instances;
	}, [size, noiseScale, heightThreshold]);

	return (
		<InstancedRigidBodies
			type="fixed"
			instances={instances}
		>
			<Instances
				ref={instanceRef}
				limit={900}
			>
				<boxGeometry />
				<meshStandardMaterial
					map={grass /**Conditionally render here, dirt texture or grass texture. */}
				/>
				{instances.map((instance, index) => (
					<Instance
						key={instance.key}
						scale={1}
						position={instance.position}
						rotation={instance.rotation}
						onClick={() => {
							console.log('clicked', index);
						}}
					/>
				))}
			</Instances>
		</InstancedRigidBodies>
	);
};

export default Ground_2;
