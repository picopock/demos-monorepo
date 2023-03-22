import { useState, useCallback, memo } from "react";
import { useSetRecoilState } from "recoil";
import { Input, Button } from "antd";
import { todoListState } from "../recoil";
import { getId } from "../util";

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState<string>("");
  const setTodoList = useSetRecoilState(todoListState);

  const onChange = useCallback(
    ({ target: { value } }: {target: {value: string}}) => {
      setInputValue(value);
    },
    [setInputValue]
  );

  const addItem = useCallback(() => {
    if (inputValue.length === 0) return;
    setTodoList(oldTodoList => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false
      }
    ] as any);
    setTimeout(() => {
      setInputValue("");
    }, 500);
  }, [inputValue, setTodoList, setInputValue]);

  return (
    <div style={{ display: "flex" }}>
      <Input
        type="text"
        style={{ width: "300px" }}
        value={inputValue}
        onChange={onChange}
      />
      <Button
        type="primary"
        onClick={addItem}
        disabled={inputValue.length === 0}>
        Add
      </Button>
    </div>
  );
}

export default memo(TodoItemCreator);
