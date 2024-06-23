import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import useKeyboard from '../hooks/useKeyboard';

const JUMP_VELOCITY = 4;
const SPEED = 4;

const Player = () => {
	const { backward, forward, right, left, jump } = useKeyboard();

	const { camera } = useThree();
	const [ref, move] = useSphere(() => ({
		mass: 1,
		type: 'Dynamic',
		position: [0, 1.5, 0],
	}));

	const vel = useRef([0, 0, 0]);
	useEffect(() => {
		move.velocity.subscribe((v) => (vel.current = v));
	}, [move.velocity]);

	const pos = useRef([0, 0, 0]);
	useEffect(() => {
		move.position.subscribe((p) => (pos.current = p));
	}, [move.position]);

	// fix bug > at the top of a jump, velocity is 0 so double jump is possible
	useFrame(() => {
		camera.position.copy(
			new Vector3(pos.current[0], pos.current[1], pos.current[2])
		);

		const directions = new Vector3();
		const frontVector = new Vector3(
			0,
			0,
			(backward ? 1 : 0) - (forward ? 1 : 0)
		);

		const sideVector = new Vector3(
			(left ? 1 : 0) - (right ? 1 : 0),
			0,
			0
		);

		directions
			.subVectors(frontVector, sideVector)
			.normalize()
			.multiplyScalar(SPEED)
			.applyEuler(camera.rotation);

		move.velocity.set(directions.x, vel.current[1], directions.z);

		if (jump && Math.abs(vel.current[1].toFixed(2)) < 0.05) {
			move.velocity.set(vel.current[0], JUMP_VELOCITY, vel.current[2]);
		}
	});


	return <mesh ref={ref} />;
};

export default Player;
