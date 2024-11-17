import { Input } from "antd";
import _ from "lodash";
import React, { useCallback, useState } from "react";

const DebouncedInput = ({
  onChange,
  delay = 300,
  placeholder,
  size = "middle",
  style,
}) => {
  const [value, setValue] = useState("");

  const debouncedOnChange = useCallback(
    _.debounce((newValue) => {
      onChange(newValue);
    }, delay),
    [delay, onChange]
  );

  const handleChange = (e) => {
    setValue(e.target.value);
    debouncedOnChange(e.target.value);
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      size={size}
      style={style}
    />
  );
};

export default DebouncedInput;
