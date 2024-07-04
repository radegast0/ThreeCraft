import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { RigidBody, useRapier } from '@react-three/rapier';
import grassTexture from './assets/grass.jpg';
import dirtTexture from './assets/dirt.jpg';
import useCubeStore from './store';
import { Noise } from 'noisejs';

const size = 20;
const maxHeight = 1;

const Ground = () => {
	const { physics } = useRapier();
	const noise = useMemo(() => new Noise(Math.random()), []);
	const textures = useTexture([grassTexture, dirtTexture]);

	const materials = useMemo(
		() => ({
			grass: new THREE.MeshStandardMaterial({ map: textures[0] }),
			dirt: new THREE.MeshStandardMaterial({ map: textures[1] }),
		}),
		[textures]
	);

	const generateTerrain = useCallback(() => {
		const cubes = new Array(size * size);
		for (let x = -size / 2; x < size / 2; x++) {
			for (let z = -size / 2; z < size / 2; z++) {
				const y = Math.floor(noise.simplex2(x / 10, z / 10) * maxHeight);
				const texture = y > -1 ? 'grass' : 'dirt';
				const index = x + size / 2 + (z + size / 2) * size;
				cubes[index] = { position: [x, y, z], texture };
			}
		}
		useCubeStore.setState({ cubes });
	}, [noise]);

	useEffect(() => {
		generateTerrain();
	}, [generateTerrain]);

	const cubes = useCubeStore((state) => state.cubes);

	if (!physics) {
		return null;
	}

	return (
		<RigidBody type="fixed">
			<InstancedCubes cubes={cubes} materials={materials} />
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
				<planeGeometry args={[size, size]} />
				<meshStandardMaterial color="green" />
			</mesh>
		</RigidBody>
	);
};

const InstancedCubes = ({ cubes, materials }) => {
	const instancedMeshRef = useRef();
	const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []); // Create the geometry once

	useEffect(() => {
		if (!instancedMeshRef.current) return;

		const matrix = new THREE.Matrix4();

		const instanceCount = cubes.length;
		const positions = new Float32Array(instanceCount * 3);

		cubes.forEach((cube, i) => {
			const { position, texture } = cube;
			const material = materials[texture];

			matrix.setPosition(...position);
			matrix.toArray(positions, i * 3);

			color.set(material.color);
			color.toArray(colors, i * 3);
		});

		instancedMeshRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

		instancedMeshRef.current.instanceMatrix.needsUpdate = true;
	}, [cubes, materials]);

	return (
		<InstancedMesh ref={instancedMeshRef} args={[geometry, null, cubes.length]}>
			<meshStandardMaterial />
		</InstancedMesh>
	);
};

export default Ground;
