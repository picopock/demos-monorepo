import List from './components/List';
import TodoItemCreator from './components/TodoItemCreator';
import TodoListFilters from './components/TodoListFilters';
import TodoListStats from './components/TodoListStats';

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
