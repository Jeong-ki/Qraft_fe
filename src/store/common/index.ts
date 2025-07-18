import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CommonState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const store: StateCreator<CommonState> = (set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
});

const useCommonStore = create<CommonState>()(
  devtools(store, { enabled: process.env.NODE_ENV === 'development' }),
);

export default useCommonStore;
