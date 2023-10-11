import { TaskResponse } from "@/types/API/task/TaskResponse";
import { FC, useState } from "react";
import ToDo from "./ToDo";

const genres = [
  {
    id: 1,
    name: "仕事",
  },
  {
    id: 2,
    name: "プライベート",
  },
];

export interface Props {
  tasks: TaskResponse[];
}

const ToDoContainer: FC<Props> = ({ tasks }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskGenreId, setNewTaskGenreId] = useState(genres[0].id);

  const onClickAddTask = () => {
    console.log(newTaskName, newTaskGenreId);
    setIsAddingTask(false);
    setNewTaskName("");
    setNewTaskGenreId(genres[0].id);
  };

  const onClickUpdateTask = (
    taskId: number,
    updatedName: string,
    updatedGenreId: number,
  ) => {
    // API call for updating task goes here
    console.log(taskId, updatedName, updatedGenreId);
  };

  const onClickCompleteTask = (taskId: number) => {
    // API call for completing the task goes here
    console.log(taskId);
  };

  return (
    <>
      <ToDo
        tasks={tasks}
        genres={genres}
        isAddingTask={isAddingTask}
        setIsAddingTask={setIsAddingTask}
        newTaskName={newTaskName}
        setNewTaskName={setNewTaskName}
        newTaskGenreId={newTaskGenreId}
        setNewTaskGenreId={setNewTaskGenreId}
        onClickAddTask={onClickAddTask}
        onClickUpdateTask={onClickUpdateTask}
        onClickCompleteTask={onClickCompleteTask}
      />
    </>
  );
};

export default ToDoContainer;
