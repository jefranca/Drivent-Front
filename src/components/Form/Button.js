import MuiButton from "@material-ui/core/Button";
import styled from "styled-components";

export default function Button({ variant="contained", children, ...props }) {
  return (
    <StyledMuiButton variant={variant} {...props}>
      {children}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled(MuiButton)`
  margin-top: 8px !important;

  @media(max-width: 600px){
    height: 50px;
    width:100%;
  }
`;
