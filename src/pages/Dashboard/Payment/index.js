import React, { useContext, useState } from "react";
import TicketForm from "../../../components/TicketForm/index.js";
import PaymentForm from "../../../components/PaymentForm";
import UnauthorizedMessage from "../../../components/Dashboard/shared/UnauthorizedMessage";
import Title from "../../../components/Dashboard/shared/Title";
import UserContext from "../../../contexts/UserContext";

export default function Payment() {
  const { userData } = useContext(UserContext);
  const [isTicketChosen, setIsTicketChosen] = useState(false);
  const [userOrder, setUserOrder] = useState({
    total: 0,
    ticketId: undefined
  });
  return (
    <>
      <Title> Ingresso e pagamento </Title>
      {userData.fullRegistration ? (
        <>
          {!isTicketChosen? (
            <TicketForm 
              setIsTicketChosen={setIsTicketChosen}
              userOrder={userOrder}
              setUserOrder={setUserOrder}
            />
          ) : (
            <PaymentForm 
              userOrder={userOrder}
            />
          )}

        </>
      ) : (
        <UnauthorizedMessage>
          Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso
        </UnauthorizedMessage>
      )}
    </>
  );
}
