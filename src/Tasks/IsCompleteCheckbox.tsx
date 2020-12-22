import React, { useCallback } from "react";
import { View, StyleSheet, Text, Pressable, TextStyle } from "react-native-web";
import { BsCheckCircle } from "react-icons/bs";

type Props = {
  touched?: boolean;
  value: boolean;
  error?: string;
  onChange: (f: string, v: boolean) => void;
  onBlur: (f: string, t: boolean) => void;
};

const styles = StyleSheet.create({
  error: {
    color: "#dc322f",
    opacity: 0.8,
  },
  check: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export const IsCompleteCheckbox = ({
  error,
  touched,
  onChange,
  value,
  onBlur,
}: Props): JSX.Element => {
  const handleChange = useCallback(
    (e: any) => {
      onChange("isComplete", !value);
    },
    [onChange, value]
  );

  const handleBlur = useCallback(() => {
    onBlur("category", true);
  }, [onBlur]);

  const additionalStyles: TextStyle = {};

  if (value) {
    additionalStyles.color = "#2aa198";
  }

  return (
    <View style={[styles.check, additionalStyles]}>
      <Pressable onPressIn={handleBlur} onPress={handleChange}>
        <BsCheckCircle />
      </Pressable>
      {error && touched ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};
