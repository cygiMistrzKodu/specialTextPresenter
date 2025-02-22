import { useEffect } from 'react';

interface ITaskCountStatistic {
  test: string
}
// statystyksa liczeni tasków tu będize
const TaskCountStatistic = ({ test }: ITaskCountStatistic) => {

  useEffect(() => {
    console.log(`TaskCountStatistic mounted`)
  }, [])

  return (
    <div className="TaskCountStatistic-component">
      Test content
    </div>
  )
}

export default TaskCountStatistic;
