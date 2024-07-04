import { Box, useTexture } from '@react-three/drei';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three'; // Import THREE namespace
import dirtTexture from './assets/dirt.jpg';
import glassTexture from './assets/glass.png';
import logTexture from './assets/log.jpg';
import grassTexture from './assets/grass2.jpg';
import useCubeStore from './store';

const textures = {
	dirt: dirtTexture,
	glass: glassTexture,
	log: logTexture,
	grass: grassTexture,
};

export const Cubes = () => {
	const cubes = useCubeStore((state) => state.cubes);
	return cubes.map(({ position, texture }, index) => (
		<Cube
			key={index}
			position={position}
			texture={texture}
		/>
	));
};

const Cube = ({ texture: cubeTexture, isFirstCube, ...props }) => {
	const ref = useRef();
	const [hover, setHover] = useState(null);
	const addCube = useCubeStore((state) => state.addCube);
	const selectedTexture = useCubeStore((state) => state.selectedTexture);

	const texture = useTexture(textures[cubeTexture || selectedTexture]);

	useEffect(() => {
		if (texture) {
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
		}
	}, [texture]);

	const onMove = useCallback((e) => {
		e.stopPropagation();
		setHover(Math.floor(e.faceIndex / 2));
	}, []);

	const onOut = useCallback(() => setHover(null), []);

	const onClick = useCallback(
		(e) => {
			e.stopPropagation();
			const { x, y, z } = ref.current.translation();
			const dir = [
				[x + 1, y, z],
				[x - 1, y, z],
				[x, y + 1, z],
				[x, y - 1, z],
				[x, y, z + 1],
				[x, y, z - 1],
			];

			addCube(...dir[Math.floor(e.faceIndex / 2)], selectedTexture);
		},
		[addCube, selectedTexture]
	);

	const geometry = new THREE.BoxGeometry(1, 1, 1);
	return (
		<RigidBody
			friction={0}
			type="fixed"
			mass={1}
			ref={ref}
			{...props}
		>
			<mesh
				receiveShadow
				castShadow
				onPointerMove={onMove}
				onPointerOut={onOut}
				onClick={onClick}
				geometry={geometry}
			>
				{[...Array(6)].map((_, index) => (
					<meshStandardMaterial
						attach={`material-${index}`}
						key={index}
						map={texture}
						map-repeat={[1, 1]}
						color={hover === index ? 'hotpink' : 'white'}
					/>
				))}
				
			</mesh>
		</RigidBody>
	);
};

export default Cube;
