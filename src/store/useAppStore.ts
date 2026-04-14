import { create } from 'zustand'

type AppStore = {
  activeWorkspace: 'todos' | 'form-builder'
  setActiveWorkspace: (workspace: AppStore['activeWorkspace']) => void
}

export const useAppStore = create<AppStore>((set) => ({
  activeWorkspace: 'todos',
  setActiveWorkspace: (workspace) => {
    set({ activeWorkspace: workspace })
  },
}))
