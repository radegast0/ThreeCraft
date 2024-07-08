import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

const Lights = () => {
	const light = useRef();
	useFrame((state) => {
		light.current.position.z = state.camera.position.z + 1;
		light.current.target.position.z = state.camera.position.z;
		light.current.target.updateMatrixWorld();
		// console.log(state.camera.position);
	});
	return (
		<>
			<directionalLight
				ref={light}
				castShadow
				position={[4, 4, 1]}
				intensity={4.5}
				shadow-mapSize={[1024, 1024]}
				shadow-camera-near={1}
				shadow-camera-far={30}
				shadow-camera-right={30}
				shadow-camera-bottom={-30}
				shadow-camera-left={-30}
                shadow-camera-top={30}
                
			/>
			<ambientLight intensity={1.5} />
		</>
	);
};

export default Lights;
