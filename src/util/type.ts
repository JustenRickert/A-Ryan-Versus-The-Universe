import { IObservable } from 'mobx'

export type Warning<T> = T | Error
export type Maybe<T> = T | undefined

export class Check<T> {
  value: T & IObservable
  initialized: boolean

  static map = (cs: Check<any>[], f: (c: Check<any>) => {}) => cs.map(c => f(c))
}
