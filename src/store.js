import { create } from 'zustand';

const useCubeStore = create((set) => ({
	cubes: [],
	addCube: (x, y, z) => {
		set((state) => ({ cubes: [...state.cubes, [x, y, z]] }));
	},
}));

export default useCubeStore;
