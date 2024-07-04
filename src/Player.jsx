import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { CuboidCollider, RigidBody, useRapier } from '@react-three/rapier';
import Ninja from './Ninja';

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export function Player({ speed, jump, action, setAction }) {
	const [pov, setPov] = useState(0); // 0 for first-person, 1 for third-person
	const [rotation, setRotation] = useState([0, 0, 0]);
	const body = useRef();
	const [subscribeKeys, getKeys] = useKeyboardControls();
	const { rapier, world } = useRapier();
	const [smoothedCameraPosition] = useState(() => new THREE.Vector3());

	const changePov = () => {
		setPov((prevPov) => (prevPov === 0 ? 1 : 0));
	};

	const jumpFunction = () => {
		const origin = body.current.translation();
		origin.y -= 1.05;
		const direction = { x: 0, y: -1, z: 0 };
		const ray = new rapier.Ray(origin, direction);
		const hit = world.castRay(ray, 10, true);

		if (hit.timeOfImpact < 0.2) {
			body.current.applyImpulse({ x: 0, y: jump, z: 0 });
		}
	};

	useEffect(() => {
		const unsubscribeJump = subscribeKeys(
			(state) => state.jump,
			(value) => {
				if (value) {
					jumpFunction();
				}
			}
		);

		const unsubscribePov = subscribeKeys(
			(state) => state.changePov,
			(value) => {
				if (value) {
					changePov();
				}
			}
		);

		return () => {
			unsubscribeJump();
			unsubscribePov();
		};
	}, []);

	useFrame((state, delta) => {
		// controls
		const { forward, backward, left, right } = getKeys();
		const velocity = body?.current?.linvel();
		frontVector.set(0, 0, backward - forward);
		sideVector.set(left - right, 0, 0);
		direction
			.subVectors(frontVector, sideVector)
			.normalize()
			.multiplyScalar(speed * delta * 100)
			.applyEuler(state.camera.rotation);

		body?.current?.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

		if (forward || backward || left || right) {
			setAction('run');
			if (forward && left) setRotation([0, Math.PI / 4, 0]);
			else if (forward && right) setRotation([0, -Math.PI / 4, 0]);
			else if (backward && left) setRotation([0, (3 * Math.PI) / 4, 0]);
			else if (backward && right) setRotation([0, (-3 * Math.PI) / 4, 0]);
			else if (forward) setRotation([0, 0, 0]);
			else if (backward) setRotation([0, Math.PI, 0]);
			else if (left) setRotation([0, Math.PI / 2, 0]);
			else if (right) setRotation([0, -Math.PI / 2, 0]);
		} else if (action === 'run') {
			setAction('idle');
		}

		// rotation={[0, Math.PI / 2, 0]} // rotate left
		// rotation={[0, -Math.PI / 2, 0]} // rotate right
		// rotation={[0, Math.PI, 0]} // rotate back
		// rotation={[0, 0, 0]} // rotate front
		// rotation={[0, Math.PI / 4, 0]} // rotate left front
		// rotation={[0, -Math.PI / 4, 0]} // rotate right front
		// rotation={[0, Math.PI * 3 / 4, 0]} // rotate left back
		// rotation={[0, -Math.PI * 3 / 4, 0]} // rotate right back

		const bodyPosition = body?.current?.translation();
		const cameraPosition = new THREE.Vector3();
		if (bodyPosition) {
			cameraPosition.copy(bodyPosition);
		}
		cameraPosition.y += 1.5; // Height of the camera from the player's position

		if (pov === 0) {
			state?.camera?.position?.copy(cameraPosition);
		} else {
			cameraPosition.z += 4; // Third-person view
		}

		// const cameraTarget = new THREE.Vector3();
		// cameraTarget.copy(bodyPosition);
		// cameraTarget.z -= 5;

		smoothedCameraPosition.lerp(cameraPosition, 5 * delta);

		state.camera.position.copy(
			pov === 0 ? cameraPosition : smoothedCameraPosition
		);
		// state.camera.lookAt(cameraTarget);
	});

	return (
		<RigidBody
			ref={body}
			colliders={false}
			mass={1}
			type="dynamic"
			position={[0, 2, 0]}
			enabledRotations={[false, false, false]} // Prevent rotation
			canSleep={false}
			restitution={0.2}
		>
			{pov ? (
				<Ninja
					action={action}
					rotation={rotation}
				/>
			) : (
				<></>
			)}
			<CuboidCollider args={[0.35, 1, 0.35]} />
		</RigidBody>
	);
}
