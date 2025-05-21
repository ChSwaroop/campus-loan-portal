
import { createRouteTree } from '@tanstack/react-router'
import { Route as rootRoute } from './routes'
import { Route as LoginRoute } from './routes/login'
import { Route as ChangePasswordRoute } from './routes/change-password'
import { Route as NotFoundRoute } from './routes/_not-found'

import { Route as AdminRoute } from './routes/admin'
import { Route as AdminIndexRoute } from './routes/admin/index'
import { Route as AdminUsersRoute } from './routes/admin/users'

import { Route as CounselorRoute } from './routes/counselor'
import { Route as CounselorIndexRoute } from './routes/counselor/index'
import { Route as CounselorNewApplicationRoute } from './routes/counselor/new-application'
import { Route as CounselorApplicationsRoute } from './routes/counselor/applications'
import { Route as CounselorApplicationDetailRoute } from './routes/counselor/applications.$id'

import { Route as ApproverRoute } from './routes/approver'
import { Route as ApproverIndexRoute } from './routes/approver/index'
import { Route as ApproverPendingRoute } from './routes/approver/pending'
import { Route as ApproverReviewedRoute } from './routes/approver/reviewed'
import { Route as ApproverReviewRoute } from './routes/approver/review.$id'

// Create and export the route tree
export const routeTree = createRouteTree({
  children: [
    rootRoute,
    LoginRoute,
    ChangePasswordRoute,
    NotFoundRoute,
    {
      ...AdminRoute,
      children: [
        AdminIndexRoute,
        AdminUsersRoute
      ]
    },
    {
      ...CounselorRoute,
      children: [
        CounselorIndexRoute,
        CounselorNewApplicationRoute,
        CounselorApplicationsRoute,
        CounselorApplicationDetailRoute
      ]
    },
    {
      ...ApproverRoute,
      children: [
        ApproverIndexRoute,
        ApproverPendingRoute,
        ApproverReviewedRoute,
        ApproverReviewRoute
      ]
    }
  ]
})
