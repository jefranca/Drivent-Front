import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export default function Payment() {
  const { userData } = useContext(UserContext);

  if (!userData.fullRegistration) {
    
  }

  console.log(userData);
  return (
    <>
      <StyledTypography variant="h4"> Ingresso e pagamento </StyledTypography>
      {userData.fullRegistration ? (
        <span> Tá registrado </span>
      ) : (
        <span> Sem registro </span>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
