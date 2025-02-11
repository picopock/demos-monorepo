import { List, Progress } from 'antd';
import { type ReactNode, memo, useCallback, useMemo } from 'react';
import { useTodoListStats } from '../zustand';

function TodoListStats() {
  const { totalNum, totalCompletedNum, totalUnCompletedNum, percentCompleted } =
    useTodoListStats();

  const dataSource = useMemo(() => {
    const formattedPercentCompleted = Math.round(percentCompleted * 100);
    return [
      { title: 'Total items', value: totalNum },
      { title: 'Items completed', value: totalCompletedNum },
      { title: 'Items not completed', value: totalUnCompletedNum },
      {
        title: 'Percent completed',
        value: (
          <Progress
            percent={formattedPercentCompleted}
            strokeColor={{ from: '#108ee9', to: '#87d068' }}
          />
        ),
      },
    ];
  }, [totalNum, totalCompletedNum, totalUnCompletedNum, percentCompleted]);

  const renderItem = useCallback(
    ({ title, value }: { title: string; value: ReactNode }) => {
      return (
        <List.Item style={{display: 'flex'}}>
          <span style={{flexGrow: 0, flexShrink: 0, marginRight: '24px'}}>{title}: </span>
          {value}
        </List.Item>
      );
    },
    [],
  );

  return <List bordered dataSource={dataSource} renderItem={renderItem} />;
}

export default memo(TodoListStats);
