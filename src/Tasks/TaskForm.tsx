import React, { useCallback } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native-web";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { VscAdd, VscChromeClose } from "react-icons/vsc";

import { CATEGORY } from "./types";
import { CATEGORY_OPTIONS } from "./util";
import { createTask, updateTask } from "./services";
import { useTaskStore } from "./useTaskStore";
import { CategorySelect } from "./CategorySelect";
import { IsCompleteCheckbox } from "./IsCompleteCheckbox";
import { taskStyles } from "./styles";

type Props = {
  id?: string;
  description?: string;
  category?: CATEGORY;
  isComplete?: boolean;
  close: () => void;
};

const taskSchema = Yup.object().shape({
  description: Yup.string().required("Required"),
  category: Yup.mixed<CATEGORY>()
    .oneOf(Object.values(CATEGORY))
    .required("Required"),
  isComplete: Yup.boolean().required("Required"),
});

const localStyles = StyleSheet.create({
  itemContainer: {
    padding: 5,
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
  close,
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
        close();
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
        <View style={taskStyles.container}>
          <View style={[taskStyles.itemContainer, localStyles.itemContainer]}>
            <View style={taskStyles.baseCategory}>
              <TextInput
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                multiline={true}
                numberOfLines={1}
                style={localStyles.textInput}
                placeholder="What's the task?"
                autoFocus={true}
              />
              {errors.description && touched.description ? (
                <Text style={localStyles.error}>{errors.description}</Text>
              ) : null}
            </View>

            <View style={taskStyles.baseCategory}>
              <CategorySelect
                touched={touched.category}
                error={errors.category}
                value={values.category}
                options={CATEGORY_OPTIONS}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
            </View>

            <View style={taskStyles.checkMark}>
              <IsCompleteCheckbox
                touched={touched.category}
                error={errors.category}
                value={values.isComplete}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
            </View>
          </View>
          <View style={taskStyles.buttonsContainer}>
            <Pressable
              style={taskStyles.actionIcon}
              onPress={handleSubmit as any}
              disabled={isSubmitting}
            >
              <VscAdd />
            </Pressable>

            <Pressable style={taskStyles.negativeIcon} onPress={close}>
              <VscChromeClose />
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};
