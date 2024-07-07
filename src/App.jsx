import {
	Environment,
	KeyboardControls,
	Loader,
	PointerLockControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Player } from './Player';
import { Suspense, useState } from 'react';
import TextureSelector from './TextureSelector';
import Ground_2 from './Ground_2';
import { Cubes, Cube } from './Cube';
import dirt from './assets/dirt.jpg';
import glass from './assets/glass.png';
import log from './assets/log.jpg';
import { Perf } from 'r3f-perf';

function App() {
	const [action, setAction] = useState('idle');
	const textures = {
		dirt,
		glass,
		log,
	};

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
				<Canvas
					frameloop="demand"
					shadows
					camera={{
						fov: 45,
					}}
				>
					<Environment
						files={'/lilienstein_2k.hdr'}
						background
					/>
					{/* <OrbitControls /> */}
					<directionalLight
						castShadow
						position={[4, 4, 1]}
						intensity={3.5}
					/>
					<ambientLight intensity={1.5} />
					{/* <Physics
						gravity={[0, -20, 0]}
						debug
					>
						<Ground_2 />
						<Cubes />
						<Cube />
						<Player
							setAction={setAction}
							action={action}
							speed={4}
							jump={8}
						/>
					</Physics> */}
					<PointerLockControls />
					<Suspense fallback={null}>
						<Physics
							// debug
							gravity={[0, -20, 0]}
						>
							<Ground_2 />
							<Cubes />
							<Cube
								position={[0, -4, 0]}
								texture={dirt}
							/>
							<Cube
								position={[1, -4, 0]}
								texture={glass}
							/>
							<Cube
								position={[2, -4, 0]}
								texture={log}
							/>
							<Player
								setAction={setAction}
								action={action}
								speed={3}
								jump={7}
							/>
						</Physics>
					</Suspense>
					<PointerLockControls />
					<Perf />
				</Canvas>
			</KeyboardControls>
		</>
	);
}

export default App;
