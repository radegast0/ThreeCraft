import { OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Ground from './Ground';
import { Physics } from '@react-three/rapier';
import Cube, { Cubes } from './Cube';

function App() {
	return (
		<>
			<Canvas
				shadows
				camera={{
					fov: 45,
					near: 0.1,
					far: 200,
					position: [2.5, 4, 6],
				}}
			>
				<OrbitControls />
				<Sky sunPosition={[10, 10, 10]} />
				<directionalLight
					castShadow
					position={[4, 4, 1]}
					intensity={3.5}
				/>
				<ambientLight intensity={1.5} />
				<Physics debug>
					{/* <Player /> */}
					<Ground />
					<Cube position={[0, 0.5, 0]} />
					<Cubes />
				</Physics>
			</Canvas>
			{/* <div className='cursor absolute centered'>+</div> */}
		</>
	);
}

export default App;
