import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, TextStyle, Pressable } from "react-native-web";

import { BsCheckCircle, BsTrash, BsPencil } from "react-icons/bs";

import { TaskType } from "./types";
import { taskStyles } from "./styles";
import { TaskForm } from "./TaskForm";
import { categoryLookup } from "./util";
import { useStore } from "../store";

type Props = {
  task: TaskType;
};

const localStyles = StyleSheet.create({
  baseCategory: {
    borderRightColor: "#93a1a1",
    borderRightWidth: 1,
  },
  checkMark: {
    paddingLeft: 20,
    paddingRight: 5,
  },
});

export const Task = ({ task }: Props): JSX.Element => {
  const {
    tasks: { update, remove },
  } = useStore();
  const [isInEdit, setIsInEdit] = useState(false);

  const toggleEditMode = useCallback(() => setIsInEdit(!isInEdit), [
    isInEdit,
    setIsInEdit,
  ]);

  const toggleTask = useCallback(async () => {
    await update({ ...task, isComplete: !task.isComplete });
  }, [task, update]);

  const removeTask = useCallback(async () => {
    await remove(task);
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
    <View style={taskStyles.container}>
      <View style={taskStyles.itemContainer}>
        <Text
          style={[
            taskStyles.baseCategory,
            localStyles.baseCategory,
            additionalStyles,
          ]}
        >
          {task.description}
        </Text>
        <Text
          style={[
            taskStyles.baseCategory,
            localStyles.baseCategory,
            additionalStyles,
          ]}
        >
          {categoryLookup[task.category]}
        </Text>
        <View
          style={[
            taskStyles.checkMark,
            localStyles.checkMark,
            additionalStyles,
          ]}
        >
          <Pressable onPress={toggleTask}>
            <BsCheckCircle />
          </Pressable>
        </View>
      </View>
      <View style={taskStyles.buttonsContainer}>
        <Pressable style={taskStyles.actionIcon} onPress={toggleEditMode}>
          <BsPencil />
        </Pressable>

        <Pressable style={taskStyles.negativeIcon} onPress={removeTask}>
          <BsTrash />
        </Pressable>
      </View>
    </View>
  );
};
