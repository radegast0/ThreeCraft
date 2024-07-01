import { KeyboardControls, OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Ground from './Ground';
import { Physics, RigidBody } from '@react-three/rapier';
import Cube, { Cubes } from './Cube';
import { Player } from './Player';
import { Suspense } from 'react';

function App() {
	return (
		<>
			<KeyboardControls
				map={[
					{ name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
					{ name: 'backward', keys: ['ArrowDown', 's', 'S'] },
					{ name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
					{ name: 'right', keys: ['ArrowRight', 'd', 'D'] },
					{ name: 'jump', keys: ['Space'] },
				]}
			>
				<Canvas
					shadows
					camera={{
						fov: 45,
					}}
				>
					<Sky sunPosition={[10, 10, 10]} />
					<directionalLight
						castShadow
						position={[4, 4, 1]}
						intensity={3.5}
					/>
					<ambientLight intensity={1.5} />
					<OrbitControls />
					<Suspense>
						<Physics debug>
							<Ground />
							<Player />
							<Cube position={[0, 0.5, 0]} />
							<Cubes />
						</Physics>
					</Suspense>
				</Canvas>
			</KeyboardControls>
			{/* <div className='cursor absolute centered'>+</div> */}
		</>
	);
}

export default App;
