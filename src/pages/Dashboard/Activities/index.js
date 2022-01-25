import { useContext } from "react";
import Title from "../../../components/Dashboard/shared/Title";
import UserContext from "../../../contexts/UserContext";
import styled from "styled-components";
import UnauthorizedMessage from "../../../components/Dashboard/shared/UnauthorizedMessage";

export default function Activities() {
  const { userData } = useContext(UserContext);

  return (
    <Container>
      <Title>Escolha de atividades</Title>
      {userData.ticket ? (
        <>
          <h2>Primeiro, filtre pelo dia do evento:</h2>
        </>
      ) : (
        <BoxMessage>
          <UnauthorizedMessage>
            Você precisa ter confirmado pagamento antes de fazer a escolha de
            hospedagem
          </UnauthorizedMessage>
        </BoxMessage>
        
      )}
    </Container>
  );
}

const Container = styled.div`
  font-family: "Roboto";
  & h2 {
    color: #8e8e8e;
    font-size: 20px;
    margin-bottom: 18px;
  }
`;

const BoxMessage = styled.div`
  display: flex;
  min-height: 500px;
`;
