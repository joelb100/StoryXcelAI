import { create } from 'zustand';

export type StoryOverview = {
  title: string;                 // Project Name
  projectType: string;           // e.g., Screenplay
  runtime: string;               // "90 mins" or ""
  genre?: string;                // label
  subGenres: string[];           // labels
  theme?: string;                // label
  subThemes: string[];           // labels
  centralConflict?: string;      // free text
  plotA?: string;                // free text
  plotB?: string;                // free text
  plotC?: string;                // free text
  plotTwists?: string;           // free text
  emotionalHook?: string;        // free text
};

type Store = {
  overview: StoryOverview;
  setField: <K extends keyof StoryOverview>(k: K, v: StoryOverview[K]) => void;
  setMany: (patch: Partial<StoryOverview>) => void;
  live: boolean;
  setLive: (v: boolean) => void;
};

export const useStoryOverview = create<Store>((set) => ({
  overview: {
    title: '',
    projectType: '',
    runtime: '',
    genre: '',
    subGenres: [],
    theme: '',
    subThemes: [],
    centralConflict: '',
    plotA: '',
    plotB: '',
    plotC: '',
    plotTwists: '',
    emotionalHook: ''
  },
  setField: (k, v) => set((s) => ({ overview: { ...s.overview, [k]: v } })),
  setMany: (patch) => set((s) => ({ overview: { ...s.overview, ...patch } })),
  live: true,
  setLive: (v) => set({ live: v }),
}));