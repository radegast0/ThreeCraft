import { Instance, Instances } from '@react-three/drei';
import React, { useCallback, useRef, useState } from 'react';
import { InstancedRigidBodies } from '@react-three/rapier';

const Cubes = ({ instances, texture, limit }) => {
	const instanceRef = useRef();
	const ref = useRef();
	const [clickedInstance, setClickedInstance] = useState(null);
	const [newCubePosition, setNewCubePosition] = useState(null);

	const onClick = useCallback((e, instance) => {
		e.stopPropagation();
		setClickedInstance(instance);
		setNewCubePosition(instance.position); // Set new cube position based on clicked instance
	}, []);

	return (
		<InstancedRigidBodies
			type="fixed"
			instances={instances}
		>
			<Instances
				castShadow
				receiveShadow
				ref={instanceRef}
				limit={limit}
			>
				<boxGeometry />
				<meshStandardMaterial map={texture} />
				{instances.map((instance) => (
					<Instance
						key={instance.key}
						ref={ref}
						scale={1}
						position={instance.position}
						rotation={instance.rotation}
						onClick={(e) => onClick(e, instance)}
					/>
				))}
			</Instances>
			{newCubePosition && (
				<Cube
					newCubePosition={newCubePosition}
					texture={texture}
				/>
			)}
		</InstancedRigidBodies>
	);
};

const Cube = ({ newCubePosition, texture }) => {
	return (
		<mesh
			position={[newCubePosition[0], newCubePosition[1] + 1, newCubePosition[2]]}
		>
			<boxGeometry />
			<meshStandardMaterial map={texture} />
		</mesh>
	);
};

export default Cubes;
