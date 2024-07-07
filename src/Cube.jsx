import { useCallback, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import useCubeStore from "./store";
import dirt from "./assets/dirt.jpg";
import glass from "./assets/glass.png";
import log from "./assets/log.jpg";
import grass from "./assets/grass.jpg";

const textures = {
  dirt,
  glass,
  log,
  grass,
};

export const Cubes = () => {
  const cubes = useCubeStore((state) => state.cubes);
  return cubes.map((cube, index) => (
    <Cube key={index} position={cube.position} texture={textures[cube.texture]} />
  ));
};

export function Cube(props) {
  const ref = useRef();
  const [hover, set] = useState(null);
  const addCube = useCubeStore((state) => state.addCube);
  const selectedTexture = useCubeStore((state) => state.selectedTexture);
  const texture = useTexture(props.texture || dirt);

  const onMove = useCallback((e) => {
    e.stopPropagation();
    set(Math.floor(e.faceIndex / 2));
  }, []);

  const onOut = useCallback(() => set(null), []);

  const onClick = useCallback(
    (e) => {
      e.stopPropagation();
      const { x, y, z } = ref.current.translation();
      const dir = [
        [x + 1, y, z],
        [x - 1, y, z],
        [x, y + 1, z],
        [x, y - 1, z],
        [x, y, z + 1],
        [x, y, z - 1],
      ];
      addCube(...dir[Math.floor(e.faceIndex / 2)], selectedTexture);
    },
    [addCube, selectedTexture]
  );

  return (
    <RigidBody {...props} type="fixed" colliders="cuboid" ref={ref}>
      <mesh receiveShadow castShadow onPointerMove={onMove} onPointerOut={onOut} onClick={onClick}>
        {[...Array(6)].map((_, index) => (
          <meshStandardMaterial attach={`material-${index}`} key={index} map={texture} color={hover === index ? "hotpink" : "white"} />
        ))}
        <boxGeometry />
      </mesh>
    </RigidBody>
  );
}
