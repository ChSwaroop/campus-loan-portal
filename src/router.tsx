
import { Router, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { ReactNode } from 'react'

// Create a new router instance
const router = new Router({
  routeTree,
  defaultPreload: 'intent',
  defaultErrorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-red-50 p-4">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Application Error</h1>
        <pre className="max-h-96 overflow-auto rounded bg-gray-100 p-4 text-sm">
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
      </div>
    </div>
  )
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function TanStackRouterProvider({ children }: { children?: ReactNode }) {
  return <RouterProvider router={router}>{children}</RouterProvider>
}

export default router
