import React, { useEffect, useState } from "react";
import { View, Text } from "react-native-web";
import { useHistory } from "react-router-dom";

import { Task } from "./Task";
import { useStore } from "../store";
import { taskStyles } from "./styles";

export const TaskList = (): JSX.Element => {
  const history = useHistory();
  const {
    tasks: { tasks, getAll },
  } = useStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        await getAll();
        // setIsLoading(false);
      } catch (error) {
        // Right now we just assume this is an auth error and redirect to login
        history.push("/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [getAll, history, setIsLoading]);
  console.log("what are the tasks", tasks);
  return (
    <View>
      {isLoading ? (
        <Text style={taskStyles.text}>Loading...</Text>
      ) : (
        tasks.map((task) => <Task key={task.id} task={task} />)
      )}
    </View>
  );
};
