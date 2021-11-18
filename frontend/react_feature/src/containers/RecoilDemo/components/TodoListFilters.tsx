import React, { useCallback, memo } from 'react'
import { useRecoilState } from 'recoil'
import { Select } from 'antd'
import { todoListFilterStatus, FilterStatus } from '../recoil'

function TodoListFilters() {
  const [filterStatus, setFilterStatus] = useRecoilState(todoListFilterStatus)

  const updateFilterStatus = useCallback((value) => {
    setFilterStatus(value)
  }, [setFilterStatus])

  return <>
    Filter:
    <Select style={{ width: '200px' }} onChange={updateFilterStatus} value={filterStatus}>
      {Object.entries(FilterStatus).map(([key, value]) => {
        return <Select.Option key={key} value={value}>{value}</Select.Option>
      })}
    </Select>
  </>
}

export default memo(TodoListFilters)
