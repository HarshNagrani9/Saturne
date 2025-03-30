// frontend/store/userStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      // User data
      user: null,
      isLoggedIn: false,
      
      // Set the entire user object
      setUser: (userData) => set({ 
        user: userData, 
        isLoggedIn: true 
      }),
      
      // Clear user data (logout)
      clearUser: () => set({ 
        user: null, 
        isLoggedIn: false 
      }),
      
      // Update user verification status
      updateVerification: (verificationCount, isVerified) => 
        set((state) => ({
          user: state.user ? {
            ...state.user,
            verificationCount,
            isVerified
          } : null
        })),
      
      // Update LinkedIn profile
      updateLinkedinProfile: (linkedinProfile) => 
        set((state) => ({
          user: state.user ? {
            ...state.user,
            linkedinProfile
          } : null
        })),
      
      // Update education information
      updateEducation: (education) => 
        set((state) => ({
          user: state.user ? {
            ...state.user,
            education
          } : null
        })),
      
      // Update any specific user field
      updateUserField: (fieldName, value) => 
        set((state) => ({
          user: state.user ? {
            ...state.user,
            [fieldName]: value
          } : null
        })),
    }),
    {
      name: 'user-storage', // Name for localStorage/AsyncStorage
      getStorage: () => localStorage, // Use localStorage for web (for mobile, you'd use AsyncStorage)
    }
  )
);

export default useUserStore;