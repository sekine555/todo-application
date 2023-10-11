import { TaskResponse } from "@/types/API/task/TaskResponse";
import { GenreResponse } from "@/types/API/genre/GenreResponse";
import { FC, useEffect, useState } from "react";
import ToDo from "./ToDo";
import { container } from "@/config/inversify.config";
import { TYPES } from "@/config/types";
import ITaskClient from "@/infrastructure/task/ITaskClient";
import {
  TaskCreateRequest,
  TaskUpdateRequest,
  TaskDeleteRequest,
} from "@/types/API/task/TaskRequest";

export interface Props {
  genres: GenreResponse[];
  tasks: TaskResponse[];
}

const ToDoContainer: FC<Props> = ({ genres, tasks }) => {
  const [currentTasks, setCurrentTasks] = useState<TaskResponse[]>(tasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskGenreId, setNewTaskGenreId] = useState(0);

  useEffect(() => {
    if (genres.length > 0) {
      setNewTaskGenreId(genres[0].id);
    }
  }, [genres]);

  const fetchTasks = async () => {
    const taskClient = container.get<ITaskClient>(TYPES.ITaskClient);
    const fetchedTasks = await taskClient.fetchTasks();
    setCurrentTasks(fetchedTasks);
  };

  const onClickAddTask = async () => {
    const taskClient = container.get<ITaskClient>(TYPES.ITaskClient);
    const taskCreateRequest: TaskCreateRequest = {
      name: newTaskName,
      genreId: newTaskGenreId,
      status: 0,
    };
    const createdTask = await taskClient.createTask(taskCreateRequest);
    setCurrentTasks([createdTask, ...currentTasks]);
    setIsAddingTask(false);
    setNewTaskName("");
  };

  const onClickUpdateTask = async (
    taskId: number,
    updatedName: string,
    updatedGenreId: number,
  ) => {
    const taskClient = container.get<ITaskClient>(TYPES.ITaskClient);
    const taskUpdateRequest: TaskUpdateRequest = {
      id: taskId,
      name: updatedName,
      genreId: updatedGenreId,
      status: 0,
    };
    const updatedTask = await taskClient.updateTask(taskUpdateRequest);
    setCurrentTasks(
      currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
    );
  };

  const onClickCompleteTask = async (taskId: number) => {
    const taskClient = container.get<ITaskClient>(TYPES.ITaskClient);
    const taskDeleteRequest: TaskDeleteRequest = {
      id: taskId,
    };
    await taskClient.deleteTask(taskDeleteRequest);
    await fetchTasks();
  };

  return (
    <>
      <ToDo
        genres={genres}
        tasks={currentTasks}
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
