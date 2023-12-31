import { FC } from "react";
import { Props as ToDoContainerProps } from "@/features/todo/ToDoContainer";
import { formatDateYYYYMMDD } from "@/utils/dataUtils";

interface Props extends ToDoContainerProps {
  isAddingTask: boolean;
  setIsAddingTask: (val: boolean) => void;
  newTaskName: string;
  setNewTaskName: (val: string) => void;
  newTaskGenreId: number;
  setNewTaskGenreId: (val: number) => void;
  onClickAddTask: () => void;
  onClickUpdateTask: (
    taskId: number,
    updatedName: string,
    updatedGenreId: number,
  ) => void;
  onClickCompleteTask: (taskId: number) => void;
}

const ToDo: FC<Props> = ({
  genres,
  tasks,
  isAddingTask,
  setIsAddingTask,
  newTaskName,
  setNewTaskName,
  newTaskGenreId,
  setNewTaskGenreId,
  onClickAddTask,
  onClickUpdateTask,
  onClickCompleteTask,
}) => {
  return (
    <div className="p-6">
      {isAddingTask ? (
        <div className="mb-8">
          <select
            value={newTaskGenreId}
            onChange={(e) => setNewTaskGenreId(Number(e.target.value))}
            className="mr-2"
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <input
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="タスク"
            className="mr-2 rounded border p-1"
          />

          <button className="ml-2" onClick={onClickAddTask} className="mr-2">
            タスクを追加する
          </button>

          <button className="ml-2" onClick={() => setIsAddingTask(false)}>
            キャンセルする
          </button>
        </div>
      ) : (
        <div className="mb-8">
          <button onClick={() => setIsAddingTask(true)}>タスクを追加</button>
        </div>
      )}

      <section className="mb-6">
        <h2 className="mb-4 text-xl">未完了のタスク</h2>
        {tasks
          .filter((task) => task.status === 0)
          .map((task) => (
            <div key={task.id} className="mb-2 rounded bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <select
                    value={task.genre.id}
                    onChange={(e) =>
                      onClickUpdateTask(
                        task.id,
                        task.name,
                        Number(e.target.value),
                      )
                    }
                    className="mr-2"
                  >
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                  <input
                    defaultValue={task.name}
                    onBlur={(e) =>
                      onClickUpdateTask(task.id, e.target.value, task.genre.id)
                    }
                    className="rounded border p-1"
                  />
                  <span className="ml-2 text-gray-500">
                    {formatDateYYYYMMDD(task.registrationDate)}
                  </span>
                </div>
                <button
                  onClick={() => onClickCompleteTask(task.id)}
                  className="ml-2 rounded bg-green-500 px-2 py-1 text-white"
                >
                  完了
                </button>
              </div>
            </div>
          ))}
      </section>

      <section>
        <h2 className="my-4 text-xl">完了したタスク</h2>
        {tasks
          .filter((task) => task.status === 1)
          .map((task) => (
            <div key={task.id} className="mb-2 rounded bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <strong className="mr-2">{task.genre.name}</strong>
                {task.name}
                <span className="text-gray-500">
                  {formatDateYYYYMMDD(task.registrationDate)}
                </span>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default ToDo;
