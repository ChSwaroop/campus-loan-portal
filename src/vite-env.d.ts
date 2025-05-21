
/// <reference types="vite/client" />

// Add type declarations for Tanstack Router
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      parentRoute: {};
    };
    '/login': {
      parentRoute: {};
    };
    '/change-password': {
      parentRoute: {};
    };
    '/_not-found': {
      parentRoute: {};
    };
    '/admin': {
      parentRoute: {};
    };
    '/admin/': {
      parentRoute: typeof import('./routes/admin').Route;
    };
    '/admin/users': {
      parentRoute: typeof import('./routes/admin').Route;
    };
    '/counselor': {
      parentRoute: {};
    };
    '/counselor/': {
      parentRoute: typeof import('./routes/counselor').Route;
    };
    '/counselor/new-application': {
      parentRoute: typeof import('./routes/counselor').Route;
    };
    '/counselor/applications': {
      parentRoute: typeof import('./routes/counselor').Route;
    };
    '/counselor/applications/$id': {
      parentRoute: typeof import('./routes/counselor').Route;
    };
    '/approver': {
      parentRoute: {};
    };
    '/approver/': {
      parentRoute: typeof import('./routes/approver').Route;
    };
    '/approver/pending': {
      parentRoute: typeof import('./routes/approver').Route;
    };
    '/approver/reviewed': {
      parentRoute: typeof import('./routes/approver').Route;
    };
    '/approver/review/$id': {
      parentRoute: typeof import('./routes/approver').Route;
    };
  }
}
