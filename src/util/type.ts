import { IObservable } from 'mobx'

export type Warning<T> = T | Error
export type Maybe<T> = T | undefined

export class Checked<T> {
  value: T & IObservable
  initialized: boolean

  // static map = <T>(cs: Checked<T>[], f: (c: Checked<T>) => {}) =>
  //   cs.map<T>(c => f(c))
}
