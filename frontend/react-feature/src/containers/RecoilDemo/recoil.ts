import { atom, selector } from 'recoil';

export const textState = atom<string>({
  key: 'textState',
  default: '',
});

export const charCountState = selector<number>({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState);
    return text?.length || 0;
  },
});

export interface TodoListItem {
  id: number;
  text: string;
  isComplete: boolean;
}

export const todoListState = atom<TodoListItem[]>({
  key: 'todoListState',
  default: [],
});

export const FilterStatus = {
  ShowAll: 'Show All',
  ShowCompleted: 'Show Completed',
  ShowUnCompleted: 'Show UnCompleted',
};

export const todoListFilterStatus = atom({
  key: 'todoListFilterStatus',
  default: FilterStatus.ShowAll,
});

export const filteredTodoListState = selector<TodoListItem[]>({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filterStatus = get(todoListFilterStatus);
    const list: any = get(todoListState);

    switch (filterStatus) {
      case FilterStatus.ShowCompleted:
        return list.filter((item: any) => item.isComplete);
      case FilterStatus.ShowUnCompleted:
        return list.filter((item: any) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
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
    };
  },
});
