import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native-web";
import { VscAdd } from "react-icons/vsc";

import { TaskList } from "./TaskList";
import { TaskForm } from "./TaskForm";
import { getTasks } from "./services";
import { useTaskStore } from "./useTaskStore";

const styles = StyleSheet.create({
  container: {
    padding: 60,
    display: "flex",
    alignItems: "center",
  },
  headerContainer: {
    marginBottom: 50,
    marginTop: 30,
  },
  header: {
    fontSize: 36,
    color: "#002b36",
    marginBottom: 10,
    alignSelf: "center",
  },
  text: {
    fontSize: 18,
    color: "#586e75",
    display: "flex",
    alignItems: "center",
  },
  addContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  addButton: {
    color: "#268bd2",
    marginHorizontal: 5,
  },
});

export const Tasks = (): JSX.Element => {
  const { tasks, setTasks } = useTaskStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false);

  const toggleForm = useCallback(
    () => setIsNewTaskFormOpen(!isNewTaskFormOpen),
    [isNewTaskFormOpen, setIsNewTaskFormOpen]
  );

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
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Fast Todo</Text>
        {isNewTaskFormOpen ? (
          <TaskForm close={toggleForm} />
        ) : (
          <View style={styles.addContainer}>
            <Pressable onPress={toggleForm}>
              <Text style={styles.text}>
                Add a task
                <View style={styles.addButton}>
                  <VscAdd />
                </View>
              </Text>
            </Pressable>
          </View>
        )}
      </View>
      {isLoading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <TaskList taskList={tasks} />
      )}
    </View>
  );
};
