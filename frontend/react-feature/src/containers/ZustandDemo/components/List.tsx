import { Button, Checkbox, Input } from 'antd';
import { type ChangeEventHandler, memo, useCallback } from 'react';
import {
  type TodoListItem,
  useFilteredTodoList,
  useTodoListStore
} from '../zustand';
import { removeItemAtIndex, replaceItemAtIndex } from '../util';

function List() {
  const todoList = useFilteredTodoList();
  return todoList.map((todoItem) => {
    return <MemoListItem key={todoItem.id} item={todoItem} />;
  });
}

export default memo(List);

function ListItem({ item }: { item: TodoListItem }) {
  const todoList  = useTodoListStore<TodoListItem[]>(state => state.items)
  const setTodoList = useTodoListStore(state => state.updateTodoList)
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { value } }) => {
      const newList = replaceItemAtIndex(todoList, index, {
        ...item,
        text: value,
      });
      setTodoList(newList);
    },
    [index, todoList, item, setTodoList],
  );

  const toggleItemCompletion = useCallback(() => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });
    setTodoList(newList);
  }, [index, todoList, item, setTodoList]);

  const deleteItem = useCallback(() => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  }, [index, todoList, setTodoList]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '50px' }}>
      <Input
        style={{ width: '300px', marginRight: '20px' }}
        value={item.text}
        onChange={editItemText}
      />
      <Checkbox checked={item.isComplete} onChange={toggleItemCompletion} />
      <Button
        style={{ marginLeft: '20px' }}
        type="primary"
        onClick={deleteItem}
      >
        Delete
      </Button>
    </div>
  );
}

const MemoListItem = memo(ListItem);
