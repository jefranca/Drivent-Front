import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export default function SubTitle({ text }) {
  return <StyledTitle variant="h6"> {text}</StyledTitle>;
}

const StyledTitle = styled(Typography)`
  margin-bottom: 10px !important;
  color: #838383;
`;
