import { Input } from 'antd';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import TodoList from './TodoList';
import { charCountState, textState } from './recoil';

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
  const [text, setText] = useRecoilState(textState);
  const onChange = useCallback(
    (event: any) => {
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
  const count = useRecoilValue(charCountState);
  return <>Character Count: {count}</>;
}
