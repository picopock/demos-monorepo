import { Select } from 'antd';
import { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { FilterStatus,  useTodoListStore } from '../zustand';

function TodoListFilters() {
  const [filterStatus, updateFilterStatus] = useTodoListStore(useShallow(state => [state.filterStatus, state.updateFilterStatus]))

  return (
    <>
      Filter:
      <Select
        style={{ width: '200px', marginLeft: '12px', marginBottom: '24px' }}
        onChange={updateFilterStatus}
        value={filterStatus}
      >
        {Object.entries(FilterStatus).map(([key, value]) => {
          return (
            <Select.Option key={key} value={value}>
              {value}
            </Select.Option>
          );
        })}
      </Select>
    </>
  );
}

export default memo(TodoListFilters);
