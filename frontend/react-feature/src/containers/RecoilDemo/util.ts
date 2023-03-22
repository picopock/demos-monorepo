let id = 0;
export function getId() {
  return id++;
}

export function replaceItemAtIndex(arr: [], index: number, newValue: any) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function removeItemAtIndex(arr: [], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}