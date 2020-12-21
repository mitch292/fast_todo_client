import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native-web";

import { TaskList } from "./TaskList";
import { getTasks } from "./services";
import { useTaskStore } from "./useTaskStore";

const styles = StyleSheet.create({
  container: {
    padding: 60,
    display: "flex",
    alignItems: "center",
  },
  header: {
    fontSize: 36,
    color: "#002b36",
    marginTop: 30,
    marginBottom: 50,
  },
  text: {
    fontSize: 18,
    color: "#586e75",
    alignSelf: "center",
  },
});

export const Tasks = () => {
  const { tasks, setTasks } = useTaskStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
      setIsLoading(false);
    };
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fast Todo</Text>
      {isLoading ? <Text>Loading...</Text> : <TaskList taskList={tasks} />}
    </View>
  );
};
