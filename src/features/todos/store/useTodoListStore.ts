import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TodoStatusFilter } from '../api/todos.ts'

type TodoListStore = {
  currentPage: number
  searchTerm: string
  selectedUserId: number | 'all'
  statusFilter: TodoStatusFilter
  setCurrentPage: (page: number) => void
  setSearchTerm: (value: string) => void
  setSelectedUserId: (userId: number | 'all') => void
  setStatusFilter: (status: TodoStatusFilter) => void
}

export const TODOS_PER_PAGE = 12

export const useTodoListStore = create<TodoListStore>()(
  persist(
    (set) => ({
      currentPage: 1,
      searchTerm: '',
      selectedUserId: 'all',
      statusFilter: 'all',
      setCurrentPage: (page) => {
        set({ currentPage: page })
      },
      setSearchTerm: (value) => {
        set({
          searchTerm: value,
          currentPage: 1,
        })
      },
      setSelectedUserId: (userId) => {
        set({
          selectedUserId: userId,
          currentPage: 1,
        })
      },
      setStatusFilter: (status) => {
        set({
          statusFilter: status,
          currentPage: 1,
        })
      },
    }),
    {
      name: 'todo-list-view-store',
    },
  ),
)
