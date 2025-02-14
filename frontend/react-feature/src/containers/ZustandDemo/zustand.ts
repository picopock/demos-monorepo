import { useMemo } from 'react'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

export const useTextStore = create<{
  text: string,
  getCount(): number,
  updateText: (val: string) => void
}>((set, get) => ({
  text: '',
  getCount() {
    return get().text.length;
  },
  updateText: (val) => set((/* state */) => ({ text: val })),
}))
export const useCharCount = () => {
  const text = useTextStore(state => state.text)
  return text.length;
}

export interface TodoListItem {
  id: number;
  text: string;
  isComplete: boolean;
}

export const FilterStatus = {
  ShowAll: 'Show All',
  ShowCompleted: 'Show Completed',
  ShowUnCompleted: 'Show UnCompleted',
};

export interface TodoListUpdator{
  (prevItems: TodoListItem[]): TodoListItem[]
}

export interface FilterStatusUpdator{
  (prevStatus: string): void
}

export const useTodoListStore = create<{
  filterStatus: string,
  updateFilterStatus: FilterStatusUpdator,
  items: TodoListItem[],
  updateTodoList: (itemsOrUpdator: TodoListItem[] | TodoListUpdator) => void,
}>((set, get) => ({
  filterStatus: FilterStatus.ShowAll,
  updateFilterStatus: (filterStatus: string) => {
    set({ filterStatus })
  },
  items: [],
  updateTodoList: (itemsOrUpdator: TodoListItem[] | TodoListUpdator) => {
    const items = typeof itemsOrUpdator == 'function' ? itemsOrUpdator(get().items): itemsOrUpdator
    set({items: items})
  }
}))

export const useFilteredTodoList = () => {
  const [filterStatus, items] = useTodoListStore(useShallow(state => [state.filterStatus, state.items]))
  const todoList = useMemo(()=> {
    switch (filterStatus) {
      case FilterStatus.ShowCompleted:
        return items.filter((item: TodoListItem) => item.isComplete);
      case FilterStatus.ShowUnCompleted:
        return items.filter((item: TodoListItem) => !item.isComplete);
      default:
        return items;
    }
  }, [filterStatus, items]);
  return todoList
}

export const useTodoListStats = () => {
  const todoList = useTodoListStore(state => state.items)
  const { length: totalNum } = todoList;
  const { length: totalCompletedNum } = todoList.filter(
    (item: any) => item.isComplete,
  );
  const totalUnCompletedNum = totalNum - totalCompletedNum;
  const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;
  return {
    totalNum,
    totalCompletedNum,
    totalUnCompletedNum,
    percentCompleted,
  }
}