import { Head } from "@/components/Head";
import Header from "@/components/layouts/Header";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { container } from "@/config/inversify.config";
import { TYPES } from "@/config/types";
import ITaskClient from "@/infrastructure/task/ITaskClient";
import { TaskResponse } from "@/types/API/task/TaskResponse";

const TopPage: NextPage = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const taskClient = container.get<ITaskClient>(TYPES.ITaskClient);
      const fetchedTasks = await taskClient.fetchTasks();
      console.log("fetchedTasks:", fetchedTasks);
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  return (
    <>
      <Head />
      <Header />
      <div className={"flex min-h-screen"}>TODO</div>
    </>
  );
};

export default TopPage;
