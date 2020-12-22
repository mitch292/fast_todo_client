import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextStyle,
  Pressable,
  Button,
} from "react-native-web";

import { BsCheckCircle, BsTrash, BsPencil } from "react-icons/bs";

import { Task as TaskType } from "./types";
import { categoryLookup } from "./util";
import { useTaskStore } from "./useTaskStore";
import { updateTask, deleteTask } from "./services";
import { TaskForm } from "./TaskForm";

type Props = {
  task: TaskType;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  itemContainer: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  },
  baseCategory: {
    padding: 5,
    borderRightColor: "#93a1a1",
    maxWidth: 300,
    minWidth: 300,
    borderRightWidth: 1,
    marginLeft: 10,
    color: "#002b36",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  checkMark: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  trashCan: {
    paddingHorizontal: 10,
    color: "#dc322f",
    opacity: 0.5,
  },
  pencil: {
    color: "#002b36",
    paddingHorizontal: 10,
    borderEndColor: "#002b36",
    borderEndWidth: 1,
  },
});

export const Task = ({ task }: Props): JSX.Element => {
  const { update, remove } = useTaskStore();
  const [isInEdit, setIsInEdit] = useState(false);

  const toggleEditMode = useCallback(() => setIsInEdit(!isInEdit), [
    isInEdit,
    setIsInEdit,
  ]);

  const toggleTask = useCallback(async () => {
    const newTask = await updateTask({ ...task, isComplete: !task.isComplete });
    update(newTask);
  }, [task, update]);

  const removeTask = useCallback(async () => {
    await deleteTask(task);
    remove(task);
  }, [task, remove]);

  const additionalStyles: TextStyle = {};

  if (task.isComplete) {
    additionalStyles.textDecorationLine = "line-through";
    additionalStyles.color = "#2aa198";
  }

  if (isInEdit) {
    return (
      <TaskForm
        id={task.id}
        description={task.description}
        category={task.category}
        isComplete={task.isComplete}
        close={toggleEditMode}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={[styles.baseCategory, additionalStyles]}>
          {task.description}
        </Text>
        <Text style={[styles.baseCategory, additionalStyles]}>
          {categoryLookup[task.category]}
        </Text>
        <View style={[styles.checkMark, additionalStyles]}>
          <Pressable onPress={toggleTask}>
            <BsCheckCircle />
          </Pressable>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.pencil} onPress={toggleEditMode}>
          <BsPencil />
        </Pressable>

        <Pressable style={styles.trashCan} onPress={removeTask}>
          <BsTrash />
        </Pressable>
      </View>
    </View>
  );
};
