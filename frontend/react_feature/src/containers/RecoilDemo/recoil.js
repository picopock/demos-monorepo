import { atom, selector } from 'recoil'

export const textState = atom({
  key: 'textState',
  default: ''
})

export const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState);
    return text?.length
  }
})

export const todoListState = atom({
  key: 'todoListState',
  default: []
})


export const FilterStatus = {
  ShowAll: 'Show All',
  ShowCompleted: 'Show Completed',
  ShowUnCompleted: 'Show UnCompleted'
}

export const todoListFilterStatus = atom({
  key: 'todoListFilterStatus',
  default: FilterStatus.ShowAll
})

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filterStatus = get(todoListFilterStatus);
    const list = get(todoListState)

    switch (filterStatus) {
      case FilterStatus.ShowCompleted:
        return list.filter(item => item.isComplete)
      case FilterStatus.ShowUnCompleted:
        return list.filter(item => !item.isComplete)
      default:
        return list
    }
  }
})

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const { length: totalNum } = todoList;
    const { length: totalCompletedNum } = todoList.filter(item => item.isComplete)
    const totalUnCompletedNum = totalNum - totalCompletedNum
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUnCompletedNum,
      percentCompleted,
    }
  }
})