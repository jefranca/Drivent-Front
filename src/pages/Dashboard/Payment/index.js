import { useContext } from "react";
import TicketForm from "../../../components/TicketForm/index.js";
import PaymentForm from "../../../components/PaymentForm";
import UnauthorizedMessage from "../../../components/Dashboard/shared/UnauthorizedMessage";
import Title from "../../../components/Dashboard/shared/Title";
import UserContext from "../../../contexts/UserContext";

export default function Payment() {
  const { userData } = useContext(UserContext);

  return (
    <>
      <Title> Ingresso e pagamento </Title>
      {userData.fullRegistration ? (
        <>
          <TicketForm />
        </>
      ) : (
        <UnauthorizedMessage>
          Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso
        </UnauthorizedMessage>
      )}
    </>
  );
}
