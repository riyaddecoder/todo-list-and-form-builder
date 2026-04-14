import { NavLink, Outlet } from 'react-router-dom'
import { navigationItems } from './navigation.ts'
import styles from './DashboardLayout.module.css'

export function DashboardLayout() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brandBlock}>
          <h1 className={styles.title}>Task Studio</h1>
        </div>

        <nav aria-label="Primary" className={styles.navigation}>
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
