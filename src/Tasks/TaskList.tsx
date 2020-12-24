import React from "react";
import { View } from "react-native-web";

import { Task } from "./Task";
import { TaskType } from "./types";

type Props = {
  taskList?: TaskType[];
};

export const TaskList = ({ taskList = [] }: Props): JSX.Element => {
  return (
    <View>
      {taskList.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </View>
  );
};
