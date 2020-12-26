import React, { useCallback } from "react";
import { View, Text, TextInput, Pressable } from "react-native-web";
import { useHistory } from "react-router-dom";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { authStyles } from "./styles";
import { useStore } from "../store";

const registerSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export const Register = (): JSX.Element => {
  const history = useHistory();
  const {
    auth: { register },
  } = useStore();

  const switchToLogin = useCallback(() => {
    history.push("/login");
  }, [history]);
  const submitHandler = useCallback(
    async (
      { username, password }: FormikValues,
      { setSubmitting, setErrors, setStatus, resetForm }
    ) => {
      try {
        await register({ username, password });
        resetForm({});
        setStatus({ success: true });
        history.push("/tasks");
      } catch (error) {
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ submit: error.message });
      }
    },
    [register, history]
  );

  return (
    <View style={authStyles.container}>
      <View style={authStyles.headerContainer}>
        <Text style={authStyles.header}>Fast Todo</Text>
        <View style={authStyles.subHeaderContainer}>
          <Text style={authStyles.subHeader}>Register</Text>
        </View>
      </View>
      <View style={authStyles.cardContainer}>
        <Formik
          initialValues={{ username: "", fullName: "", password: "" }}
          onSubmit={submitHandler}
          validationSchema={registerSchema}
        >
          {({
            isSubmitting,
            errors,
            touched,
            values,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <View style={authStyles.formContainer}>
              <View style={authStyles.formGroup}>
                <Text style={authStyles.inputLabel}>Username:</Text>
                <View style={authStyles.inputContainer}>
                  <TextInput
                    style={authStyles.input}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                  />
                </View>
                {errors.username && touched.username ? (
                  <Text style={authStyles.formError}>{errors.username}</Text>
                ) : null}
              </View>
              <View style={authStyles.formGroup}>
                <Text style={authStyles.inputLabel}>Password:</Text>
                <View style={authStyles.inputContainer}>
                  <TextInput
                    style={authStyles.input}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={true}
                  />
                </View>
                {errors.password && touched.password ? (
                  <Text style={authStyles.formError}>{errors.password}</Text>
                ) : null}
              </View>
              <Pressable
                style={authStyles.buttonContainer}
                onPress={handleSubmit as any}
                disabled={isSubmitting}
              >
                <Text style={authStyles.buttonText}>Register</Text>
              </Pressable>
              <Pressable
                style={authStyles.linkContainer}
                onPress={switchToLogin}
              >
                <Text style={authStyles.linkText}>Already a user? Login.</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};
