import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native-web";
import Select, { OptionsType, ValueType } from "react-select";

type Option = {
  value: string;
  label: string;
};

type Props = {
  touched?: boolean;
  value: string;
  error?: string;
  options: OptionsType<Option>;
  onChange: (f: string, v: string) => void;
  onBlur: (f: string, t: boolean) => void;
};

const styles = StyleSheet.create({
  error: {
    color: "#dc322f",
    opacity: 0.8,
  },
});

export const CategorySelect = ({
  options,
  error,
  touched,
  onChange,
  value,
  onBlur,
}: Props): JSX.Element => {
  const handleChange = useCallback(
    (v: ValueType<Option, false>) => {
      if (v) {
        onChange("category", v.value);
      }
    },
    [onChange]
  );

  const handleBlur = useCallback(() => {
    onBlur("category", true);
  }, [onBlur]);

  const selectValue = useMemo(
    () => options.find((option) => option.value === value),
    [value, options]
  );

  const customStyles = {
    input: (base: any) => ({
      font: "inherit",
      size: 14,
    }),
    control: (base: any) => ({
      ...base,
      height: 36,
      minHeight: 36,
    }),
    option: (base: any) => ({
      ...base,
      height: 36,
      minHeight: 36,
      color: "#002b36",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#002b36",
    }),
    indicatorContainer: (base: any) => ({
      ...base,
      height: 36,
      minHeight: 36,
    }),
  };

  return (
    <View>
      <Select
        id="category"
        options={options}
        menuPortalTarget={document.body}
        onChange={handleChange}
        onBlur={handleBlur}
        value={selectValue}
        styles={customStyles}
        placeholder="Select a category"
      />
      {error && touched ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};
