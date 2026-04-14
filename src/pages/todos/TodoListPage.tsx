import { useDeferredValue, useEffect } from 'react'
import {
  TODOS_PER_PAGE,
  useTodoListStore,
} from '../../features/todos/store/useTodoListStore.ts'
import { useTodoListData } from '../../features/todos/hooks/useTodoListData.ts'
import { TodoFeedback } from '../../features/todos/components/TodoFeedback.tsx'
import { TodoFilters } from '../../features/todos/components/TodoFilters.tsx'
import { TodoPagination } from '../../features/todos/components/TodoPagination.tsx'
import { TodoTable } from '../../features/todos/components/TodoTable.tsx'
import styles from './TodoListPage.module.css'

export function TodoListPage() {
  const { todos, users, isLoading, errorMessage } = useTodoListData()
  const currentPage = useTodoListStore((state) => state.currentPage)
  const searchTerm = useTodoListStore((state) => state.searchTerm)
  const selectedUserId = useTodoListStore((state) => state.selectedUserId)
  const statusFilter = useTodoListStore((state) => state.statusFilter)
  const setCurrentPage = useTodoListStore((state) => state.setCurrentPage)
  const setSearchTerm = useTodoListStore((state) => state.setSearchTerm)
  const setSelectedUserId = useTodoListStore((state) => state.setSelectedUserId)
  const setStatusFilter = useTodoListStore((state) => state.setStatusFilter)
  const deferredSearchTerm = useDeferredValue(searchTerm)

  const normalizedSearchTerm = deferredSearchTerm.trim().toLowerCase()
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      normalizedSearchTerm.length === 0 ||
      todo.title.toLowerCase().includes(normalizedSearchTerm)
    const matchesUser =
      selectedUserId === 'all' || todo.userId === selectedUserId
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && todo.completed) ||
      (statusFilter === 'pending' && !todo.completed)

    return matchesSearch && matchesUser && matchesStatus
  })

  const totalPages = Math.max(1, Math.ceil(filteredTodos.length / TODOS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const paginatedTodos = filteredTodos.slice(
    (safeCurrentPage - 1) * TODOS_PER_PAGE,
    safeCurrentPage * TODOS_PER_PAGE,
  )

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage)
    }
  }, [currentPage, safeCurrentPage, setCurrentPage])

  if (isLoading) {
    return (
      <TodoFeedback
        title="Loading todos"
        message="We are fetching tasks and user information from the API."
      />
    )
  }

  if (errorMessage) {
    return (
      <TodoFeedback
        title="Unable to load todos"
        message={`Something went wrong while loading the todo list: ${errorMessage}`}
      />
    )
  }

  return (
    <div className={styles.page}>
      <TodoFilters
        searchTerm={searchTerm}
        selectedUserId={selectedUserId}
        statusFilter={statusFilter}
        users={users}
        onSearchChange={setSearchTerm}
        onUserChange={setSelectedUserId}
        onStatusChange={setStatusFilter}
      />

      <div className={styles.summaryBar}>
        <p className={styles.summaryText}>
          Showing <span className={styles.summaryStrong}>{paginatedTodos.length}</span>{' '}
          of <span className={styles.summaryStrong}>{filteredTodos.length}</span>{' '}
          filtered todos from{' '}
          <span className={styles.summaryStrong}>{todos.length}</span> total tasks.
        </p>
      </div>

      {filteredTodos.length === 0 ? (
        <TodoFeedback
          title="No todos found"
          message="Try changing the search term or filters to see more results."
        />
      ) : (
        <>
          <TodoTable todos={paginatedTodos} />
          <TodoPagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  )
}
