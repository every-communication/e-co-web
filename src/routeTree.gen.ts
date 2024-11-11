/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AfterAuthRouteImport } from './routes/_after-auth/route'
import { Route as AfterAuthFriendsImport } from './routes/_after-auth/friends'
import { Route as AuthAuthRouteImport } from './routes/_auth/auth/route'
import { Route as AuthAuthRegisterCompleteImport } from './routes/_auth/auth/register-complete'
import { Route as AuthAuthOauthRegisterImport } from './routes/_auth/auth/oauth-register'
import { Route as AuthAuthOauthCallbackImport } from './routes/_auth/auth/oauth-callback'

// Create Virtual Routes

const AfterAuthIndexLazyImport = createFileRoute('/_after-auth/')()
const AfterAuthMyPageLazyImport = createFileRoute('/_after-auth/my-page')()
const AuthAuthIndexLazyImport = createFileRoute('/_auth/auth/')()
const AuthAuthRegisterLazyImport = createFileRoute('/_auth/auth/register')()
const AfterAuthVideoTelegraphyCodeLazyImport = createFileRoute(
  '/_after-auth/video-telegraphy/$code',
)()

// Create/Update Routes

const AfterAuthRouteRoute = AfterAuthRouteImport.update({
  id: '/_after-auth',
  getParentRoute: () => rootRoute,
} as any)

const AfterAuthIndexLazyRoute = AfterAuthIndexLazyImport.update({
  path: '/',
  getParentRoute: () => AfterAuthRouteRoute,
} as any).lazy(() =>
  import('./routes/_after-auth/index.lazy').then((d) => d.Route),
)

const AfterAuthMyPageLazyRoute = AfterAuthMyPageLazyImport.update({
  path: '/my-page',
  getParentRoute: () => AfterAuthRouteRoute,
} as any).lazy(() =>
  import('./routes/_after-auth/my-page.lazy').then((d) => d.Route),
)

const AfterAuthFriendsRoute = AfterAuthFriendsImport.update({
  path: '/friends',
  getParentRoute: () => AfterAuthRouteRoute,
} as any)

const AuthAuthRouteRoute = AuthAuthRouteImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthAuthIndexLazyRoute = AuthAuthIndexLazyImport.update({
  path: '/',
  getParentRoute: () => AuthAuthRouteRoute,
} as any).lazy(() =>
  import('./routes/_auth/auth/index.lazy').then((d) => d.Route),
)

const AuthAuthRegisterLazyRoute = AuthAuthRegisterLazyImport.update({
  path: '/register',
  getParentRoute: () => AuthAuthRouteRoute,
} as any).lazy(() =>
  import('./routes/_auth/auth/register.lazy').then((d) => d.Route),
)

const AfterAuthVideoTelegraphyCodeLazyRoute =
  AfterAuthVideoTelegraphyCodeLazyImport.update({
    path: '/video-telegraphy/$code',
    getParentRoute: () => AfterAuthRouteRoute,
  } as any).lazy(() =>
    import('./routes/_after-auth/video-telegraphy.$code.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthAuthRegisterCompleteRoute = AuthAuthRegisterCompleteImport.update({
  path: '/register-complete',
  getParentRoute: () => AuthAuthRouteRoute,
} as any)

const AuthAuthOauthRegisterRoute = AuthAuthOauthRegisterImport.update({
  path: '/oauth-register',
  getParentRoute: () => AuthAuthRouteRoute,
} as any)

const AuthAuthOauthCallbackRoute = AuthAuthOauthCallbackImport.update({
  path: '/oauth-callback',
  getParentRoute: () => AuthAuthRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_after-auth': {
      id: '/_after-auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AfterAuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth/auth': {
      id: '/_auth/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthAuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/_after-auth/friends': {
      id: '/_after-auth/friends'
      path: '/friends'
      fullPath: '/friends'
      preLoaderRoute: typeof AfterAuthFriendsImport
      parentRoute: typeof AfterAuthRouteImport
    }
    '/_after-auth/my-page': {
      id: '/_after-auth/my-page'
      path: '/my-page'
      fullPath: '/my-page'
      preLoaderRoute: typeof AfterAuthMyPageLazyImport
      parentRoute: typeof AfterAuthRouteImport
    }
    '/_after-auth/': {
      id: '/_after-auth/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AfterAuthIndexLazyImport
      parentRoute: typeof AfterAuthRouteImport
    }
    '/_auth/auth/oauth-callback': {
      id: '/_auth/auth/oauth-callback'
      path: '/oauth-callback'
      fullPath: '/auth/oauth-callback'
      preLoaderRoute: typeof AuthAuthOauthCallbackImport
      parentRoute: typeof AuthAuthRouteImport
    }
    '/_auth/auth/oauth-register': {
      id: '/_auth/auth/oauth-register'
      path: '/oauth-register'
      fullPath: '/auth/oauth-register'
      preLoaderRoute: typeof AuthAuthOauthRegisterImport
      parentRoute: typeof AuthAuthRouteImport
    }
    '/_auth/auth/register-complete': {
      id: '/_auth/auth/register-complete'
      path: '/register-complete'
      fullPath: '/auth/register-complete'
      preLoaderRoute: typeof AuthAuthRegisterCompleteImport
      parentRoute: typeof AuthAuthRouteImport
    }
    '/_after-auth/video-telegraphy/$code': {
      id: '/_after-auth/video-telegraphy/$code'
      path: '/video-telegraphy/$code'
      fullPath: '/video-telegraphy/$code'
      preLoaderRoute: typeof AfterAuthVideoTelegraphyCodeLazyImport
      parentRoute: typeof AfterAuthRouteImport
    }
    '/_auth/auth/register': {
      id: '/_auth/auth/register'
      path: '/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthAuthRegisterLazyImport
      parentRoute: typeof AuthAuthRouteImport
    }
    '/_auth/auth/': {
      id: '/_auth/auth/'
      path: '/'
      fullPath: '/auth/'
      preLoaderRoute: typeof AuthAuthIndexLazyImport
      parentRoute: typeof AuthAuthRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AfterAuthRouteRoute: AfterAuthRouteRoute.addChildren({
    AfterAuthFriendsRoute,
    AfterAuthMyPageLazyRoute,
    AfterAuthIndexLazyRoute,
    AfterAuthVideoTelegraphyCodeLazyRoute,
  }),
  AuthAuthRouteRoute: AuthAuthRouteRoute.addChildren({
    AuthAuthOauthCallbackRoute,
    AuthAuthOauthRegisterRoute,
    AuthAuthRegisterCompleteRoute,
    AuthAuthRegisterLazyRoute,
    AuthAuthIndexLazyRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_after-auth",
        "/_auth/auth"
      ]
    },
    "/_after-auth": {
      "filePath": "_after-auth/route.tsx",
      "children": [
        "/_after-auth/friends",
        "/_after-auth/my-page",
        "/_after-auth/",
        "/_after-auth/video-telegraphy/$code"
      ]
    },
    "/_auth/auth": {
      "filePath": "_auth/auth/route.tsx",
      "children": [
        "/_auth/auth/oauth-callback",
        "/_auth/auth/oauth-register",
        "/_auth/auth/register-complete",
        "/_auth/auth/register",
        "/_auth/auth/"
      ]
    },
    "/_after-auth/friends": {
      "filePath": "_after-auth/friends.tsx",
      "parent": "/_after-auth"
    },
    "/_after-auth/my-page": {
      "filePath": "_after-auth/my-page.lazy.tsx",
      "parent": "/_after-auth"
    },
    "/_after-auth/": {
      "filePath": "_after-auth/index.lazy.tsx",
      "parent": "/_after-auth"
    },
    "/_auth/auth/oauth-callback": {
      "filePath": "_auth/auth/oauth-callback.tsx",
      "parent": "/_auth/auth"
    },
    "/_auth/auth/oauth-register": {
      "filePath": "_auth/auth/oauth-register.tsx",
      "parent": "/_auth/auth"
    },
    "/_auth/auth/register-complete": {
      "filePath": "_auth/auth/register-complete.tsx",
      "parent": "/_auth/auth"
    },
    "/_after-auth/video-telegraphy/$code": {
      "filePath": "_after-auth/video-telegraphy.$code.lazy.tsx",
      "parent": "/_after-auth"
    },
    "/_auth/auth/register": {
      "filePath": "_auth/auth/register.lazy.tsx",
      "parent": "/_auth/auth"
    },
    "/_auth/auth/": {
      "filePath": "_auth/auth/index.lazy.tsx",
      "parent": "/_auth/auth"
    }
  }
}
ROUTE_MANIFEST_END */
