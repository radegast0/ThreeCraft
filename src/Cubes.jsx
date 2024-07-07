import { Instance, Instances } from '@react-three/drei';
import React, { useCallback } from 'react';
import { InstancedRigidBodies } from '@react-three/rapier';
import useStore from './store';

const Cubes = ({ texture, limit }) => {
    const instances = useStore((state) => state.instances);
    const addCube = useStore((state) => state.addCube);

    const onClick = useCallback((e, instance) => {
        const faceIndex = Math.floor(e.faceIndex / 2);
        e.stopPropagation();

        const [x, y, z] = instance.position;
        console.log('position:', x, y, z, 'faceIndex:', faceIndex);
        
        const directions = [
            [x + 1, y, z], // right
            [x - 1, y, z], // left
            [x, y + 1, z], // top
            [x, y - 1, z], // bottom
            [x, y, z + 1], // front
            [x, y, z - 1], // back
        ];

        const newCubePosition = directions[faceIndex];
        console.log('Adding cube at:', newCubePosition);
        addCube(...newCubePosition, texture);
		console.log('texture:', texture);
    }, [addCube]);

    return (
        <InstancedRigidBodies type="fixed" instances={instances}>
            <Instances frustumCulled={false} castShadow receiveShadow limit={limit}>
                <boxGeometry />
                <meshStandardMaterial map={texture} />
                {instances.map((instance) => (
                    <Instance
                        key={instance.key}
                        scale={1}
                        position={instance.position}
                        rotation={instance.rotation}
                        onClick={(e) => onClick(e, instance)}
                    />
                ))}
            </Instances>
        </InstancedRigidBodies>
    );
};

export default Cubes;
