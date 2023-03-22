import TodoListStats from "./components/TodoListStats";
import TodoListFilters from "./components/TodoListFilters";
import TodoItemCreator from "./components/TodoItemCreator";
import List from "./components/List";

export default function TodoList() {
  return (
    <>
      <TodoListStats />
      <br />
      <TodoListFilters />
      <br />
      <TodoItemCreator />
      <br />
      <List />
    </>
  );
}
