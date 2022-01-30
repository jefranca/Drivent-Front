import { useRef } from "react";
import ReactDOM from "react-dom";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import styled from "styled-components";

const FormControlWrapper = styled.section`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;

export default function MultiSelect({
  label,
  name,
  id,
  value,
  onChange,
  children,
  error,
}) {
  const inputLabelRef = useRef(null);

  return (
    <FormControlWrapper>
      <FormControl variant="outlined" error={Boolean(error)} >
        <InputLabel ref={inputLabelRef} htmlFor={id}>
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={onChange}
          input={
            <OutlinedInput
              labelWidth={
                ReactDOM.findDOMNode(inputLabelRef.current)?.offsetWidth
              }
              name={name}
              id={id}
            />
          }
        >
          {children}
        </Select>
        {error && (
          <FormHelperText error={Boolean(error)}>{error}</FormHelperText>
        )}
      </FormControl>
    </FormControlWrapper>
  );
}
