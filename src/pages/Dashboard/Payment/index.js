import React, { useContext, useState } from "react";
import TicketForm from "../../../components/TicketForm/index.js";
import PaymentForm from "../../../components/PaymentForm";
import UnauthorizedMessage from "../../../components/shared/UnauthorizedMessage";
import Title from "../../../components/shared/Title";
import UserContext from "../../../contexts/UserContext";

export default function Payment() {
  const { userData } = useContext(UserContext);
  const [isTicketChosen, setIsTicketChosen] = useState(Boolean(userData.ticket));
  const [userOrder, setUserOrder] = useState({
    total: userData.ticket?.price || 0,
    ticketId: userData.ticket?.id
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
