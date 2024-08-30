import { Select } from 'antd';
import { memo, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { FilterStatus, todoListFilterStatus } from '../recoil';

function TodoListFilters() {
  const [filterStatus, setFilterStatus] = useRecoilState(todoListFilterStatus);

  const updateFilterStatus = useCallback(
    (value: string) => {
      setFilterStatus(value);
    },
    [setFilterStatus],
  );

  return (
    <>
      Filter:
      <Select
        style={{ width: '200px' }}
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
