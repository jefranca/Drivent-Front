import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export default function Title({ children }) {
  return <StyledTitle variant="h4"> {children}</StyledTitle>;
}

const StyledTitle = styled(Typography)`
  margin-bottom: 20px !important;
`;
