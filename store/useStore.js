import { create } from "zustand";

const useStore = create((set,get) => ({
  currentList: null,
  items: [],
  listId: null,
  setCurrentList: (list) => set({ currentList: list }),
  refetchTrigger:false,
  toggleRefetchTrigger:()=>set((state)=>({refetchTrigger:!state.refetchTrigger})),

  createList: async (listData) => {
    try {
      const response = await fetch("/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listData),
      });
      if (!response.ok) throw new Error("Failed to create list");
      const list = await response.json();
      set({ currentList: list, listId: list.id });

      return list;
    } catch (error) {
      console.error("Error creating list:", error);
      throw error;
    }
  },

  updateList:async(listData,listId)=>{
    const response=await fetch(`api/lists/${listId}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(listData)
    })
    if(!response.ok)throw new Error("Failed to update list")
    const list=await response.json()
    set({currentList:list})
  },

  addItem: async (item) => {

    try {
      const response = await fetch(`/api/lists/${item.listId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.name,
          description: item.description,
          imageUrl: item.imageUrl,
        }),
      });
      if (!response.ok) throw new Error("Failed to add item");
      const { data } = await response.json();
      set((state) => ({
        items: [...state.items, data],
      }));
      return data;
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  },  

  addVote: async (itemId) => {
    try {
      const response = await fetch(`/api/lists/${itemId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to add vote");
      const { data } = await response.json();
      set((state) => ({
        items: state.items.map((item) =>
          item.id === itemId
            ? { ...item, votes: [...(item.votes || []), data] }
            : item
        ),
      }));
      return data;
    } catch (error) {
      console.error("Error adding vote:", error);
      throw error;
    }
  },

  fetchListItems: async (listId) => {
    try {
      const response = await fetch(`/api/lists/${listId}`);
      if (!response.ok) throw new Error("Failed to fetch list");
      const { data } = await response.json();
      set({
        currentList: data,
        items: data.items || [],
      });
      return data;
    } catch (error) {
      console.error("Error fetching list:", error);
      throw error;
    }
  },
}));

export default useStore;
