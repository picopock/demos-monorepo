import type { TodoListItem } from './recoil';

let id = 0;
export function getId() {
  return id++;
}

export function replaceItemAtIndex(
  arr: TodoListItem[],
  index: number,
  newValue: TodoListItem,
) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function removeItemAtIndex(arr: TodoListItem[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
