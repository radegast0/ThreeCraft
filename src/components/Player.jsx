import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';

const Player = () => {
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
	useFrame(() => {
		camera.position.copy(
			new Vector3(pos.current[0], pos.current[1], pos.current[2])
		);
		// move.velocity.set(0, 1, 0);
	});

	return <mesh ref={ref} />;
};

export default Player;
