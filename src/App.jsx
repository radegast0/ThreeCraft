import {
	KeyboardControls,
	Loader,
	OrbitControls,
	PerformanceMonitor,
	PointerLockControls,
	Sky,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Ground from './Ground';
import { Physics } from '@react-three/rapier';
import Cube, { Cubes } from './Cube';
import { Player } from './Player';
import { Suspense, useState } from 'react';
import TextureSelector from './TextureSelector';
import { getPerf, Perf } from 'r3f-perf';

function App() {
	const [action, setAction] = useState('idle');

	

	return (
		<>
			<TextureSelector />
			<div className="">
				<div className="absolute flex flex-col top-5 left-5 text-lg drop-shadow-md text-white select-none pointer-events-none z-50 font-mono">
					<span>press c to change the pov</span>
					<span className="text-sm">
						use numbers or press buttons to change the cube
					</span>
				</div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-slate-300 select-none pointer-events-none z-50 ">
					+
				</div>
			</div>
			<KeyboardControls
				map={[
					{ name: 'forward', keys: ['KeyW'] },
					{ name: 'backward', keys: ['KeyS'] },
					{ name: 'left', keys: ['KeyA'] },
					{ name: 'right', keys: ['KeyD'] },
					{ name: 'jump', keys: ['Space'] },
					{ name: 'changePov', keys: ['c', 'C'] },
				]}
			>
				<Suspense fallback={<Loader />}>
					<Canvas
						frameloop="demand"
						shadows
						camera={{
							fov: 45,
							near: 0.1,
							far: 25,
						}}
					>
						<Sky sunPosition={[10, 10, 10]} />
						<directionalLight
							castShadow
							position={[4, 4, 1]}
							intensity={3.5}
						/>
						{/* <OrbitControls /> */}
						<ambientLight intensity={1.5} />
						<Physics
							gravity={[0, -20, 0]}
							// debug
						>
							<Ground />
							<Player
								setAction={setAction}
								action={action}
								speed={4}
								jump={8}
							/>
							{/* <Cube position={[0, 0.5, 0]} /> */}
							<Cubes />
							{/* <Perf /> */}

						</Physics>
						<PointerLockControls />
						
					</Canvas>
				</Suspense>
			</KeyboardControls>
		</>
	);
}

export default App;
