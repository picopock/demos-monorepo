import { Button, Input } from 'antd';
import { memo, useCallback, useState } from 'react';
import { useTodoListStore } from '../zustand';
import { getId } from '../util';

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState<string>('');
  const setTodoList = useTodoListStore(state => state.updateTodoList)

  const onChange = useCallback(
    ({ target: { value } }: { target: { value: string } }) => {
      setInputValue(value);
    },
    [setInputValue],
  );

  const addItem = useCallback(() => {
    if (inputValue.length === 0) return;
    setTodoList(
      (oldTodoList) =>
        [
          ...oldTodoList,
          {
            id: getId(),
            text: inputValue,
            isComplete: false,
          },
        ],
    );
    setTimeout(() => {
      setInputValue('');
    }, 500);
  }, [inputValue, setTodoList, setInputValue]);

  return (
    <div style={{ display: 'flex' }}>
      <Input
        type="text"
        style={{ width: '300px' }}
        value={inputValue}
        onChange={onChange}
      />
      <Button
        type="primary"
        onClick={addItem}
        disabled={inputValue.length === 0}
      >
        Add
      </Button>
    </div>
  );
}

export default memo(TodoItemCreator);
