import { Input } from 'antd';
import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow'
import TodoList from './TodoList';
import { useCharCount, useTextStore } from './zustand';

export default function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
      <TodoList />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useTextStore<[string, (val: string) => void]>(useShallow((state) => [state.text, state.updateText]));
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    [setText],
  );

  return (
    <div>
      <Input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}



function CharacterCount() {
  // const count = useTextStore(state => state.getCount())
  const count = useCharCount()
  return <>Character Count: {count}</>;
}
