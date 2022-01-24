import UnauthorizedMessage from "../../../components/Dashboard/shared/UnauthorizedMessage";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

export default function Hotel() {
  const { userData } = useContext(UserContext);

  return (
    <>
      <StyledTypography variant="h4"> Ingresso e pagamento </StyledTypography>
      {userData.ticket ? (
        <>Em breve!</>
      ) : (
        <UnauthorizedMessage>
          Você precisa completar o pagamento antes de prosseguir pra escolha de
          ingresso
        </UnauthorizedMessage>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
