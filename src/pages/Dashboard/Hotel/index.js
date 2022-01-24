import UnauthorizedMessage from "../../../components/Dashboard/shared/UnauthorizedMessage";
import Title from "../../../components/Dashboard/shared/Title";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

export default function Hotel() {
  const { userData } = useContext(UserContext);
  return (
    <>
      <Title> Escolha de hotel e quarto </Title>
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
