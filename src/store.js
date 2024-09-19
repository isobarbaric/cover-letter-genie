import create from 'zustand';

const useStore = create((set) => ({
  isOnboardingCompleted: false,
  completeOnboarding: () => set({ isOnboardingCompleted: true }),
  resetOnboarding: () => set({ isOnboardingCompleted: false }),
}));

export default useStore;
