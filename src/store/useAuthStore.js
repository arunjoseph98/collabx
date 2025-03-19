
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { email, groups, profilePic, username, _id }
      token: sessionStorage.getItem("auth-token") || null, 
      isAuth: Boolean(sessionStorage.getItem("auth-token")), 

      login: (userData, authToken) => {
        sessionStorage.setItem("auth-token", authToken); 
        set({ user: userData, token: authToken, isAuth: true });
      },

      logout: () => {
        sessionStorage.removeItem("auth-token"); 
        sessionStorage.removeItem("auth-storage"); 
        set({ user: null, token: null, isAuth: false });
      },

      updateUser: (updatedFields) => {
        set((state) => ({
          user: { ...state.user, ...updatedFields }, 
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


