import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TextStyle, Pressable} from 'react-native-web';

import {BsCheckCircle, BsTrash} from 'react-icons/bs'

import { Task as TaskType, CATEGORY } from './types';
import { useTaskStore } from './useTaskStore'
import { updateTask, deleteTask } from './services';

type Props = {
	task: TaskType;
}

const categoryLookup = {
	[CATEGORY.TESTING_TASK]: "Testing Task",
	[CATEGORY.PRODUCT_REQUEST]: "Product Request",
	[CATEGORY.REFACTOR]: "Existing Code Refactor",
	[CATEGORY.DEV_TASK]: "Development Task",
	[CATEGORY.DESIGN_REQUEST]: "Design Request",
	[CATEGORY.MISC]: "Miscellaneous",
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		padding: 15,
		marginVertical: 5,
		alignItems: 'center'
	},
	itemContainer: {
		padding: 15,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
	},
	baseCategory: {
		padding: 5,
		borderRightColor: "#93a1a1",
		maxWidth: 250,
		minWidth: 250,
		borderRightWidth: 1,
		marginLeft: 10,
	},
	checkMark: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		maxWidth: 25,
		minWidth: 25,
	},
	trashCan: {
		marginHorizontal: 20,
		color: '#dc322f',
	}
});

export const Task = ({task}: Props): JSX.Element => {
	const { update, remove } = useTaskStore();
	
	const toggleTask = useCallback(async () => {
		const newTask = await updateTask({...task, isComplete: !task.isComplete});
		update(newTask);
	}, [task, update]);

	const removeTask = useCallback(async () => {
		await deleteTask(task);
		remove(task);
	}, [task, remove])


	const additionalStyles: TextStyle = {};

	if (task.isComplete) {
		additionalStyles.textDecorationLine = 'line-through';
		additionalStyles.color = '#2aa198';
	}

	return (
		<View style={styles.container}>
			<View style={styles.itemContainer}>
				<Text style={[styles.baseCategory, additionalStyles]}>{task.description}</Text>
				<Text style={[styles.baseCategory, additionalStyles]}>{categoryLookup[task.category]}</Text>
				<View style={[styles.checkMark, additionalStyles]}>
					<Pressable onPress={toggleTask}>
						<BsCheckCircle />
					</Pressable>
				</View>
			</View>
			<View style={styles.trashCan}>
				<Pressable onPress={removeTask}>
					<BsTrash />
				</Pressable>
			</View>
		</View>

	);
}