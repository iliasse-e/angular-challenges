export interface Store<T> {
  addAll(valueList: T[]): void;

  addOne(value: T): void;

  deleteOne(id: number): void;
}
