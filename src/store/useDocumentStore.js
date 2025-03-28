import { create } from "zustand";
import {
  getUserDocumentsAPI,
  loadDocAPI,
  saveDocAPI,
  updateDocTitleAPI,
} from "../services/allAPI";
import { debounce } from "lodash";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { WebSocketURL } from "../services/serverURL";

const useDocumentStore = create((set, get) => ({
  alldocuments: [],
  loading: false,
  document: {
    title: "",
    owner: null,
    collaborators: [],
    _id: null,
  },

  ydoc: null,
  provider: null,
  yText: null,
  awareness: null,
  lastSavedUpdate: null,
  initializeYjs: async (docId, userdata) => {
    if (get().ydoc) {
      console.warn("Y.js already initialized.");
      return;
    }

    try {
      const response = await loadDocAPI(docId);
      console.log(response.data);
      const { _id, title, owner, collaborators, content } = response.data;

      // Create Y.js document
      const ydoc = new Y.Doc();
      // console.log(content);
      if (content) {
        console.log("Applying Y.js update to the document...");
        Y.applyUpdate(ydoc, new Uint8Array(content));
      } else {
        console.warn("No content found, starting with an empty document.");
      }
      // console.log("docId",docId);
      // WebSocket provider
      const provider = new WebsocketProvider(WebSocketURL, docId, ydoc);

      provider.on("status", (event) => {
        console.log("WebSocket Status:", event.status);
      });

      // Create shared text
      const yText = ydoc.getText("quill");

      // Awareness API for presence tracking
      const awareness = provider.awareness;

      awareness.setLocalStateField("user", {
        name: userdata.name,
        color: userdata.color,
      });

      set({
        ydoc,
        provider,
        yText,
        awareness,
        document: {
          title,
          owner,
          collaborators,
          _id,
        },
      });

      // Track document changes & auto-save
      get().trackChanges();
    } catch (error) {
      console.error("Error", error);
    }

    
    return () => {
      get().cleanupYjs(); 
    };
  },

  cleanupYjs: async () => {
    const { provider, ydoc, saveDocument } = get();
    if (ydoc) {
      console.log("Saving document before disconnecting...");
      await saveDocument.flush(); 
      ydoc.off("update");
    }
    if (provider) {
      provider.disconnect();
      provider.destroy(); 
    }
    if (ydoc) {
      ydoc.destroy();
    }

    set({ ydoc: null, provider: null, yText: null, awareness: null });
  },

 
  fetchUserDocuments: async (userId) => {
    set({ loading: true });
    try {
      const response = await getUserDocumentsAPI(userId);
      if (response.status === 200) {
        set({ alldocuments: response.data });
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
    set({ loading: false });
  },

  saveDocument: debounce(async () => {
    const { ydoc, document } = get();
    if (!document._id || !ydoc) return;

    try {
      const update = Y.encodeStateAsUpdate(ydoc);
      const reqBody = { content: Array.from(update) };

      await saveDocAPI(document._id, reqBody);
      console.log("Document auto-saved");

    
      set({ lastSavedUpdate: update });
    } catch (error) {
      console.error("Error auto-saving document:", error);
    }
  }, 5000), // Debounced save every 5 seconds if changes occur



  trackChanges: () => {
    const { ydoc, saveDocument, lastSavedUpdate } = get();
    if (!ydoc) return;

    ydoc.off("update");

    ydoc.on(
      "update",
      debounce(() => {
        const currentUpdate = Y.encodeStateAsUpdate(ydoc);

        if (
          lastSavedUpdate &&
          currentUpdate.toString() === lastSavedUpdate.toString()
        ) {
          console.log("No meaningful changes detected, skipping save.");
          return;
        }

        console.log("Change detected, scheduling save...");
        saveDocument();
      }, 3000)
    ); 
  },

  titleupdate: async (docId, title) => {
    try {
      const response = await updateDocTitleAPI(docId, { title: title });

      if (response.status !== 200) {
        set((state) => ({
          document: { ...state.document, title },
        }));
        console.error("Failed to update title in DB:", response);
      }
    } catch (error) {
      console.error("Error updating title:", error);
    }
  },
}));

export default useDocumentStore;
