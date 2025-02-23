import { useEffect, useState } from 'react';
import CountFiled from "../CountFiled";
import { TaskContent  } from '../types'

interface ITaskCountStatistic {
  tasks: TaskContent[]
}

const TaskCountStatistic = ({ tasks }: ITaskCountStatistic) => {

  const [toDoTasksCount, setToDoTaskCount] = useState<number>(0);
  
    const countToDoTasks = (tasks: TaskContent[]): number => {
      return tasks.filter((task) => task.isDone === false && task.content !== "")
        .length;
    };
  
    const [doneTasksCount, setDoneTasksCount] = useState<number>(0);
  
    const countDoneTasks = (tasks: TaskContent[]): number => {
      return tasks.filter((task) => task.isDone === true && task.content !== "")
        .length;
    };
  
    const [emptyTasksCount, setEmptyTasksCount] = useState<number>(0);
  
    const countEmptyTasks = (tasks: TaskContent[]): number => {
      return tasks.filter((task) => task.content === "").length;
    };
  
    const [allTaskCount, setAllTaskCount] = useState<number>(0);
  
    const countAllTasks = (tasks: TaskContent[]): number => {
      return tasks.length;
    };

    useEffect(() => {
      setToDoTaskCount(countToDoTasks(tasks));
      setDoneTasksCount(countDoneTasks(tasks));
      setEmptyTasksCount(countEmptyTasks(tasks));
      setAllTaskCount(countAllTasks(tasks));
    }, [tasks]);

  return (
    <div className="flex justify-center">
        <h1 className="text-3xl font-bold underline text-yellow-500 text-center">
          Tasks
        </h1>
        <div className="ms-6">
          <CountFiled title="ToDo" count={toDoTasksCount} gradientColorFrom="black" gradinetColorTo="#005ce6" />
          <CountFiled title="Done" count={doneTasksCount} gradientColorFrom="black" gradinetColorTo="#800000" />
          <CountFiled title="Empty" count={emptyTasksCount} gradientColorFrom="black" gradinetColorTo="#558000" />
          <CountFiled title="All" count={allTaskCount} gradientColorFrom="black" gradinetColorTo="#248f24" />
        </div>
      </div>
  )
}

export default TaskCountStatistic;
