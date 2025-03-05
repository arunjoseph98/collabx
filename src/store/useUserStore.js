import { create } from "zustand";
import { getAllUsersAPI, addSharedUserAPI, removeSharedUserAPI } from "../services/allAPI";

const useUserStore = create((set, get) => ({
  allUsers: [],
  sharedUsers: [],
  loading: false,

  // Fetch all users
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await getAllUsersAPI();
      if (response.status === 200) {
        set({ allUsers: response.data });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    set({ loading: false });
  },

  // Add a user manually to the shared list
  addUserManually: async (docId, userEmail) => {
    try {
      await addSharedUserAPI(docId, userEmail);
      set((state) => ({ sharedUsers: [...state.sharedUsers, userEmail] }));
    } catch (error) {
      console.error("Error adding user:", error);
    }
  },

  // Remove a user manually from the shared list
  removeUserManually: async (docId, userEmail) => {
    try {
      await removeSharedUserAPI(docId, userEmail);
      set((state) => ({
        sharedUsers: state.sharedUsers.filter((user) => user !== userEmail),
      }));
    } catch (error) {
      console.error("Error removing user:", error);
    }
  },

  // Reset shared users
  resetSharedUsers: () => set({ sharedUsers: [] }),
}));

export default useUserStore;
