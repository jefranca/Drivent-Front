import UnauthorizedMessage from "../../../components/Dashboard/shared/UnauthorizedMessage";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export default function Hotel() {
  const isPaid = false;

  return (
    <>
      <StyledTypography variant="h4"> Ingresso e pagamento </StyledTypography>
      {isPaid ? (
        <>Em breve!</>
      ) : (
        <UnauthorizedMessage>
          Você precisa completar o pagamento antes de prosseguir pra escolha
          de ingresso
        </UnauthorizedMessage>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
