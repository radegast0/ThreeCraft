import { KeyboardControls, PointerLockControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Ground from './Ground';
import { Physics } from '@react-three/rapier';
import Cube, { Cubes } from './Cube';
import { Player } from './Player';
import { Suspense, useState } from 'react';

function App() {
	const [action, setAction] = useState('idle');
	return (
		<>
			<div className="">
				<div className="outer"> press c to change the pov</div>
				<div className="cursor">+</div>
			</div>
			<KeyboardControls
				map={[
					{ name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
					{ name: 'backward', keys: ['ArrowDown', 's', 'S'] },
					{ name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
					{ name: 'right', keys: ['ArrowRight', 'd', 'D'] },
					{ name: 'jump', keys: ['Space'] },
					{ name: 'changePov', keys: ['c', 'C'] },
				]}
			>
				<Canvas
					shadows
					camera={{
						fov: 75,
					}}
				>
					<Sky sunPosition={[10, 10, 10]} />
					<directionalLight
						castShadow
						position={[4, 4, 1]}
						intensity={3.5}
					/>
					<ambientLight intensity={1.5} />
					<Suspense>
						<Physics
							gravity={[0, -9.81, 0]}
							// debug
						>
							<Ground />
							<Player
								setAction={setAction}
								action={action}
								speed={5}
								jump={5}
							/>
							<Cube position={[0, 0.5, 0]} />
							<Cubes />
						</Physics>
						<PointerLockControls moveRight={1} />
					</Suspense>
				</Canvas>
			</KeyboardControls>
		</>
	);
}

export default App;
