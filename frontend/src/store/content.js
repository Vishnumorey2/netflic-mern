import { create } from "zustand";

export const useContentStore = create((set) => ({

    contentType: 'movies',
    setContent: (content) => set({contentType: content}),
})) 