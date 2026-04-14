import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout.tsx'
import { FormBuilderPage } from '../pages/form-builder/FormBuilderPage.tsx'
import { FormPreviewPage } from '../pages/form-preview/FormPreviewPage.tsx'
import { TodoListPage } from '../pages/todos/TodoListPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/todos" replace />,
      },
      {
        path: 'todos',
        element: <TodoListPage />,
      },
      {
        path: 'form-builder',
        element: <FormBuilderPage />,
      },
    ],
  },
  {
    path: '/form-preview',
    element: <FormPreviewPage />,
  },
])
