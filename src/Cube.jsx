import { useTexture } from '@react-three/drei';
import React, { useCallback, useRef, useState } from 'react';
import dirt from './assets/dirt.jpg';
import useCubeStore from './store';
import { RigidBody } from '@react-three/rapier';

export const Cubes = () => {
	const cubes = useCubeStore((state) => state.cubes);
	return cubes.map((coords, index) => (
		<Cube key={index} position={coords} />
	));
};

const Cube = (props) => {
	const ref = useRef();
	const [hover, setHover] = useState(null);
	const addCube = useCubeStore((state) => state.addCube);
	const texture = useTexture(dirt);

	const onMove = useCallback((e) => {
		e.stopPropagation();
		setHover(Math.floor(e.faceIndex / 2));
	}, []);

	const onOut = useCallback(() => setHover(null), []);

	const onClick = useCallback((e) => {
		e.stopPropagation()
		const { x, y, z } = ref.current.translation()
		const dir = [
		  [x + 1, y, z],
		  [x - 1, y, z],
		  [x, y + 1, z],
		  [x, y - 1, z],
		  [x, y, z + 1],
		  [x, y, z - 1],
		]

		addCube(...dir[Math.floor(e.faceIndex / 2)])
		setAction('attack'); 
	  }, [])

	return (
		<RigidBody type='fixed' mass={1} ref={ref} {...props}>
			<mesh
				receiveShadow
				castShadow
				onPointerMove={onMove}
				onPointerOut={onOut}
				onClick={onClick}
			>
				{[...Array(6)].map((_, index) => (
					<meshStandardMaterial
						attach={`material-${index}`}
						key={index}
						map={texture}
						color={hover === index ? 'hotpink' : 'white'}
					/>
				))}
				<boxGeometry />
			</mesh>
		</RigidBody>
	);
};

export default Cube;
