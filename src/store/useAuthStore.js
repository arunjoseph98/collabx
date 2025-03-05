
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { email, groups, profilePic, username, _id }
      token: sessionStorage.getItem("auth-token") || null, // Load token separately
      isAuth: Boolean(sessionStorage.getItem("auth-token")), // Check if token exists

      login: (userData, authToken) => {
        sessionStorage.setItem("auth-token", authToken); // Store token separately
        set({ user: userData, token: authToken, isAuth: true });
      },

      logout: () => {
        sessionStorage.removeItem("auth-token"); // Remove token
        sessionStorage.removeItem("auth-storage"); // Remove user data
        set({ user: null, token: null, isAuth: false });
      },

      updateUser: (updatedFields) => {
        set((state) => ({
          user: { ...state.user, ...updatedFields }, // Merge new fields with existing user data
        }));
      },

      checkAuth: () => {
        return Boolean(get().token);
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage), // Uses sessionStorage
      partialize: (state) => ({ user: state.user }), // Exclude token from Zustand persistence
    }
  )
);

export default useAuthStore;


