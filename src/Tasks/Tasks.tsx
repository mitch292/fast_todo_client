import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native-web";
import { Link } from "react-router-dom";
import { VscAdd } from "react-icons/vsc";

import { TaskList } from "./TaskList";
import { TaskForm } from "./TaskForm";
import { useStore } from "../store";
import { AUTH_STATUS } from "../Auth";
import { taskStyles } from "./styles";

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
  const {
    auth: { status },
  } = useStore();

  const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false);

  const toggleForm = useCallback(
    () => setIsNewTaskFormOpen(!isNewTaskFormOpen),
    [isNewTaskFormOpen, setIsNewTaskFormOpen]
  );

  if (status !== AUTH_STATUS.AUTHENTICATED) {
    return <Link to="/login">Please login to continue</Link>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Fast Todo</Text>
        {isNewTaskFormOpen ? (
          <TaskForm close={toggleForm} />
        ) : (
          <View style={styles.addContainer}>
            <Pressable onPress={toggleForm}>
              <Text style={taskStyles.text}>
                Add a task
                <View style={styles.addButton}>
                  <VscAdd />
                </View>
              </Text>
            </Pressable>
          </View>
        )}
      </View>
      <TaskList />
    </View>
  );
};
