import styles from './TodoPagination.module.css'

type TodoPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function TodoPagination({
  currentPage,
  totalPages,
  onPageChange,
}: TodoPaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav aria-label="Todo pagination" className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className={styles.pages}>
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            className={page === currentPage ? styles.pageActive : styles.page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  )
}
