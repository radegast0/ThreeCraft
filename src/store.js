// import { create } from 'zustand';

// const useCubeStore = create((set) => ({
// 	cubes: [],
// 	selectedTexture: 'dirt', // Default texture
// 	addCube: (x, y, z, texture) => {
// 		set((state) => ({
// 			cubes: [
// 				...state.cubes,
// 				{ position: [x, y, z], texture: texture || state.selectedTexture },
// 			],
// 		}));
// 	},
// 	addCubes: (newCubes) =>
// 		set((state) => ({ cubes: [...state.cubes, ...newCubes] })),
// 	setSelectedTexture: (texture) => {
// 		set({ selectedTexture: texture });
// 	},
// }));

import { create } from 'zustand';

const useStore = create((set) => ({
  // initial state
  instances: [],
  setInstances: (instances) => set({ instances }),

  // texture
  selectedTexture: 'dirt',
  setSelectedTexture: (texture) => set({ selectedTexture: texture }),

  // add cube
  addCube: (x, y, z) => {
    set((state) => ({
      cubes: [
        ...state.cubes,
        { position: [x, y, z], texture: state.selectedTexture },
      ],
    }));
  },
  cubes: [],
  addCube: (x, y, z) => set((state) => ({
    cubes: [...state.cubes, { position: [x, y, z], texture: state.selectedTexture }],
  })),
}));

export default useStore;


