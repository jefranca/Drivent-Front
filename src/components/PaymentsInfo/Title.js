import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export default function Title({ text }) {
  return <StyledTitle variant="h4"> {text}</StyledTitle>;
}

const StyledTitle = styled(Typography)`
  margin-bottom: 20px !important;
`;
