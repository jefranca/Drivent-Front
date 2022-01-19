import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export default function Payment() {
  return (
    <StyledTypography variant="h4"> Ingresso e Pagamento</StyledTypography>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
