import React, { useMemo, useCallback, memo } from 'react'
import { useRecoilValue } from 'recoil'
import { Progress, List } from 'antd'
import { todoListStatsState } from '../recoil'

function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUnCompletedNum,
    percentCompleted
  } = useRecoilValue(todoListStatsState)

  const dataSource = useMemo(() => {
    const formattedPercentCompleted = Math.round(percentCompleted * 100);
    return [
      { title: 'Total items', value: totalNum },
      { title: 'Items completed', value: totalCompletedNum },
      { title: 'Items not completed', value: totalUnCompletedNum },
      {
        title: 'Percent completed',
        value: <Progress percent={formattedPercentCompleted} strokeColor={{ from: '#108ee9', to: '#87d068', }} />
      },
    ]
  }, [
    totalNum,
    totalCompletedNum,
    totalUnCompletedNum,
    percentCompleted
  ])

  const renderItem = useCallback(({ title, value }) => {
    return <List.Item>{title}: {value}</List.Item>
  }, [])

  return <List bordered dataSource={dataSource} renderItem={renderItem} />
}

export default memo(TodoListStats)