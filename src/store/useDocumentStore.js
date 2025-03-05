import { create } from "zustand";
import { getUserDocumentsAPI, loadDocAPI, saveDocAPI } from "../services/allAPI";
import { debounce } from 'lodash';
import * as Y from 'yjs';
const useDocumentStore = create((set,get) => ({
  alldocuments: [],
  loading: false,
  document: {
    title: '',
    content: new Y.Doc(),
    owner: null,
    collaborators: [],
    _id: null,
  },
  socket: null,
  setSocket: (socket) => set({ socket }),
  setDocument: (newDocument) => set({ document: newDocument }),
  updateTitle: (newTitle) =>
    set((state) => ({ document: { ...state.document, title: newTitle } })),
  setYDocContent: (yDoc) =>
    set((state) => ({ document: { ...state.document, content: yDoc } })),
  setOwner: (ownerId) =>
    set((state) => ({ document: { ...state.document, owner: ownerId } })),
  setCollaborators: (collaborators) =>
    set((state) => ({ document: { ...state.document, collaborators } })),
  setDocumentId: (id) =>
    set((state) => ({ document: { ...state.document, _id: id } })),
 
  // Fetch user's documents from backend
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

  // Connect WebSocket for real-time updates
  connectWebSocket: (docId) => {
    const ws = new WebSocket(`ws://localhost:3000/${docId}`); // Connect to the specific document

    ws.onopen = () => {
      console.log('WebSocket connected');
      get().setSocket(ws);
      
    };
    
    
    ws.onmessage = (event) => {
      console.log("hello");
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'yjsUpdate') {
          Y.applyUpdate(get().document.content, new Uint8Array(message.update));
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      get().setSocket(null);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
     // Function to send Y.js updates
     get().sendUpdate = (update) => {
      if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'yjsUpdate', update: Array.from(update) }));
      } else {
          console.error("WebSocket not open");
      }
  };
  },

 // Fetch document from MongoDB

  fetchDocument: async (docId) => {
    try {
      const response = await loadDocAPI(docId)
      // axios.get(`/api/documents/${docId}`); // Replace with your API endpoint
      const { title, content, owner, collaborators, _id } = response.data;

      const yDoc = new Y.Doc();
      if (content) {
        Y.applyUpdate(yDoc, new Uint8Array(content.data)); // Apply the stored Y.js updates
      }

      set({
        document: {
          title,
          content: yDoc,
          owner,
          collaborators,
          _id,
        },
      });
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  },

  // 🟢 Save document to MongoDB
  saveDocument: debounce(async () => {
    const { document } = get();
    if (!document._id) return; // Prevent saving if no doc exists

    try {
      const update = Y.encodeStateAsUpdate(document.content);
      const reqBody = {
        title: document.title,
        owner: document.owner,
        collaborators: document.collaborators,
        content: update,
      }
      await saveDocAPI(document._id,reqBody)
      // await axios.post(`http://localhost:5000/document/${document._id}`, );
      console.log('Document auto-saved ✅');
    } catch (error) {
      console.error('Error auto-saving document:', error);
    }
  }, 5000), // Save every 5 seconds if changes occur

  // 🟢 Listen for document changes & auto-save
  trackChanges: () => {
    const { document, saveDocument } = get();
    document.content.observe(() => {
      saveDocument(); // Trigger auto-save on Y.js document change
    });
  },
  

}));

export default useDocumentStore;
