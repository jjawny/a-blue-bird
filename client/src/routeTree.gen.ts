/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const LandingsLazyImport = createFileRoute('/landings')()
const InputsLazyImport = createFileRoute('/inputs')()
const BoringFormLazyImport = createFileRoute('/boring-form')()

// Create/Update Routes

const LandingsLazyRoute = LandingsLazyImport.update({
  id: '/landings',
  path: '/landings',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/landings.lazy').then((d) => d.Route))

const InputsLazyRoute = InputsLazyImport.update({
  id: '/inputs',
  path: '/inputs',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/inputs.lazy').then((d) => d.Route))

const BoringFormLazyRoute = BoringFormLazyImport.update({
  id: '/boring-form',
  path: '/boring-form',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/boring-form.lazy').then((d) => d.Route))

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/boring-form': {
      id: '/boring-form'
      path: '/boring-form'
      fullPath: '/boring-form'
      preLoaderRoute: typeof BoringFormLazyImport
      parentRoute: typeof rootRoute
    }
    '/inputs': {
      id: '/inputs'
      path: '/inputs'
      fullPath: '/inputs'
      preLoaderRoute: typeof InputsLazyImport
      parentRoute: typeof rootRoute
    }
    '/landings': {
      id: '/landings'
      path: '/landings'
      fullPath: '/landings'
      preLoaderRoute: typeof LandingsLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/boring-form': typeof BoringFormLazyRoute
  '/inputs': typeof InputsLazyRoute
  '/landings': typeof LandingsLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/boring-form': typeof BoringFormLazyRoute
  '/inputs': typeof InputsLazyRoute
  '/landings': typeof LandingsLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/boring-form': typeof BoringFormLazyRoute
  '/inputs': typeof InputsLazyRoute
  '/landings': typeof LandingsLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/boring-form' | '/inputs' | '/landings'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/boring-form' | '/inputs' | '/landings'
  id: '__root__' | '/' | '/boring-form' | '/inputs' | '/landings'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  BoringFormLazyRoute: typeof BoringFormLazyRoute
  InputsLazyRoute: typeof InputsLazyRoute
  LandingsLazyRoute: typeof LandingsLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  BoringFormLazyRoute: BoringFormLazyRoute,
  InputsLazyRoute: InputsLazyRoute,
  LandingsLazyRoute: LandingsLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/boring-form",
        "/inputs",
        "/landings"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/boring-form": {
      "filePath": "boring-form.lazy.tsx"
    },
    "/inputs": {
      "filePath": "inputs.lazy.tsx"
    },
    "/landings": {
      "filePath": "landings.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
