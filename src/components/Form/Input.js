import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import InputMask from "react-input-mask";

export default function Input({ mask = "", error = "", maskChar = "", formatChars, variant = "outlined", value="", onChange = () => 0, ...props }) {
  return (mask || maskChar) ? (
    <InputMask  mask={mask} maskChar={maskChar} value={value} onChange={onChange} {...(formatChars && { formatChars })}>
      {() => <StyledTextField {...props} error={Boolean(error)} helperText={error} variant={variant} />}
    </InputMask>
  ) : (
    <StyledTextField {...props} value={value} error={Boolean(error)} helperText={error} onChange={onChange} variant={variant} />
  );
}

const StyledTextField = styled(TextField)`
  margin-top: 8px !important;
`;
