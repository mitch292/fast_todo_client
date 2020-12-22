import React, { useCallback } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native-web";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { VscAdd } from "react-icons/vsc";

import { CATEGORY } from "./types";
import { CATEGORY_OPTIONS } from "./util";
import { createTask, updateTask } from "./services";
import { useTaskStore } from "./useTaskStore";
import { CategorySelect } from "./CategorySelect";
import { IsCompleteCheckbox } from "./IsCompleteCheckbox";

type Props = {
  id?: string;
  description?: string;
  category?: CATEGORY;
  isComplete?: boolean;
};

const taskSchema = Yup.object().shape({
  description: Yup.string().required("Required"),
  category: Yup.mixed<CATEGORY>()
    .oneOf(Object.values(CATEGORY))
    .required("Required"),
  isComplete: Yup.boolean().required("Required"),
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  itemContainer: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  },
  baseCategory: {
    padding: 5,
    maxWidth: 250,
    minWidth: 250,
    marginLeft: 10,
    color: "#002b36",
  },
  addButton: {
    color: "#268bd2",
    marginHorizontal: 20,
  },
  checkMark: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  error: {
    color: "#dc322f",
    opacity: 0.8,
  },
  textInput: {
    padding: 5,
  },
});

export const TaskForm = ({
  description = "",
  category = CATEGORY.MISC,
  isComplete = false,
  id,
}: Props): JSX.Element => {
  const { create, update } = useTaskStore();

  const submitHandler = useCallback(
    async (
      { description, category, isComplete }: FormikValues,
      { setSubmitting, setErrors, setStatus, resetForm }
    ) => {
      try {
        if (id) {
          const newTask = await updateTask({
            id,
            description,
            category,
            isComplete,
          });
          update(newTask);
        } else {
          const task = await createTask({
            description,
            category,
            isComplete,
          });
          create(task);
        }
        resetForm({});
        setStatus({ success: true });
      } catch (error) {
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ submit: error.message });
      }
    },
    [create, id]
  );

  return (
    <Formik
      initialValues={{ description, category, isComplete }}
      onSubmit={submitHandler}
      validationSchema={taskSchema}
    >
      {({
        isSubmitting,
        errors,
        touched,
        values,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
        handleChange,
        handleBlur,
      }) => (
        <View style={styles.container}>
          <View style={styles.itemContainer}>
            <View style={styles.baseCategory}>
              <TextInput
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                multiline={true}
                numberOfLines={1}
                style={styles.textInput}
                placeholder="What's the task?"
              />
              {errors.description && touched.description ? (
                <Text style={styles.error}>{errors.description}</Text>
              ) : null}
            </View>

            <View style={styles.baseCategory}>
              <CategorySelect
                touched={touched.category}
                error={errors.category}
                value={values.category}
                options={CATEGORY_OPTIONS}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
            </View>

            <View style={styles.checkMark}>
              <IsCompleteCheckbox
                touched={touched.category}
                error={errors.category}
                value={values.isComplete}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
            </View>
          </View>
          <Pressable
            style={styles.addButton}
            onPress={handleSubmit as any}
            disabled={isSubmitting}
          >
            <VscAdd />
          </Pressable>
        </View>
      )}
    </Formik>
  );
};
