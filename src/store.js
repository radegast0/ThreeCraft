import { create } from 'zustand';

const useCubeStore = create((set) => ({
  cubes: [],
  selectedTexture: 'dirt', // Default texture
  addCube: (x, y, z, texture) => {
    set((state) => ({
      cubes: [
        ...state.cubes,
        { position: [x, y, z], texture: texture || state.selectedTexture },
      ],
    }));
  },
  addCubes: (newCubes) => set((state) => ({ cubes: [...state.cubes, ...newCubes] })),
  clearCubes: () => set({ cubes: [] }),
  setSelectedTexture: (texture) => {
    set({ selectedTexture: texture });
  },
}));

export default useCubeStore;
