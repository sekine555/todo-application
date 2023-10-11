import { Head } from "@/components/Head";
import Header from "@/components/layouts/Header";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { container } from "@/config/inversify.config";
import { TYPES } from "@/config/types";
import ITaskClient from "@/infrastructure/task/ITaskClient";
import { TaskResponse } from "@/types/API/task/TaskResponse";
import IGenreClient from "@/infrastructure/genre/IGenreClient";
import { GenreResponse } from "@/types/API/genre/GenreResponse";
import Todo from "@/features/todo";
import Loading from "@/components/Loading";

const TopPage: NextPage = () => {
  const [genres, setGenres] = useState<GenreResponse[]>([]);
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      const genreClient = container.get<IGenreClient>(TYPES.IGenreClient);
      return await genreClient.fetchGenres();
    };

    const fetchTasks = async () => {
      const taskClient = container.get<ITaskClient>(TYPES.ITaskClient);
      return await taskClient.fetchTasks();
    };

    (async () => {
      const fetchedGenres = await fetchGenres();
      const fetchedTasks = await fetchTasks();
      setGenres(fetchedGenres);
      setTasks(fetchedTasks);
      setIsLoading(false);
    })();
  }, []);

  // NOTE: Promise.allで並列する処理を実行するとデータベースへの同時アクセスが発生する模様でエラーになった
  // "message": "@TaskRepository >>> fetchAll error: Cannot enqueue Query after invoking quit."
  // useEffect(() => {
  //   const fetchGenres = async () => {
  //     const genreClient = container.get<IGenreClient>(TYPES.IGenreClient);
  //     const fetchedGenres = await genreClient.fetchGenres();
  //     setGenres(fetchedGenres);
  //   };

  //   const fetchTasks = async () => {
  //     const taskClient = container.get<ITaskClient>(TYPES.ITaskClient);
  //     const fetchedTasks = await taskClient.fetchTasks();
  //     setTasks(fetchedTasks);
  //   };

  //   Promise.all([fetchGenres(), fetchTasks()]).then(() => {
  //     setIsLoading(false);
  //   });
  // }, []);

  return (
    <>
      <Head />
      <Header />
      <div className={"flex min-h-screen"}>
        {isLoading ? <Loading /> : <Todo genres={genres} tasks={tasks} />}
      </div>
    </>
  );
};

export default TopPage;
