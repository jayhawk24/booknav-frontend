/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from 'react'
import { StaticContext } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'

export interface LocationStates {
  '/login'?: unknown
  '/signup'?: unknown
}

export type PathName = keyof LocationStates

export interface Page {
  path: PathName
  exact?: boolean
  component:
    | ComponentType<RouteComponentProps<any, StaticContext, unknown>>
    | ComponentType<any>
    | undefined
}
