import styled from "styled-components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";
import SubTitle from "../shared/SubTitle";

import ResumeOrder from "./ResumeOrder";
import Grid from "@material-ui/core/Grid";
import Ticket from "./Ticket";

export default function PaymentInfo({ setIsTicketChosen, userOrder, setUserOrder }) {
  const { ticket } = useApi();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    ticket.getTickets()
      .then((res) => {
        setTickets(res.data);
      })
      .catch((error) => {
        toast("Erro ao carregar os tickets");
        // eslint-disable-next-line no-console
        console.error(error.response);
      });
  }, []);
  
  if (!tickets.presencial) {
    return "Carregando . . .";
  }
  /*
  function reserveTicket() {
    const body = {
      isInPerson: !isOnline,
      hasHotel: !!hasHotel,
    };
    reservation
      .postNewReservation(body)
      .then((res) => {
        toast("Ingresso reservado");
        setReservationData(res.data);
      })
      .catch(() => {
        toast("Algo deu errado!");
      });
  }
*/

  return (
    <>
      <SubTitle>
        Primeiro, escolha sua modalidade de ingresso
      </SubTitle>
      
      <TicketList
        container
        direction="row"
        justify-content="flex-start"
        align="center"
        spacing={2}
      >
        <Grid item>
          <Ticket 
            {...tickets.presencial}
            price={`R$ ${tickets.presencial.price}`}
            onSelect = {() => {
              setSelectedTicket(2);
              setUserOrder({ ...userOrder, total: 0, ticketId: undefined });
              setIsOnline(false);
            }}
            isSelected = {selectedTicket >= 2}
          />
        </Grid>
        <Grid item>
          <Ticket 
            {...tickets.online}
            price={`R$ ${tickets.online.price}`}
            onSelect = {() => {
              setSelectedTicket(1);
              setUserOrder({ ...userOrder, total: 100, ticketId: tickets.online.id });
              setIsOnline(true);
            }}
            isSelected = {selectedTicket === 1}
          />
        </Grid>
      </TicketList>

      {!isOnline && (
        <>
          <SubTitle>
            Ótimo! Agora escolha sua modalidade de hospedagem
          </SubTitle>
          <TicketList
            container
            direction="row"
            justify-content="flex-start"
            align="center"
            spacing={2}
          >
            <Grid item>
              <Ticket 
                name="Sem Hotel"
                price={"+ R$ 0"}
                onSelect = {() => {
                  setSelectedTicket(3);
                  setUserOrder({ ...userOrder, total: 250, ticketId: tickets.presencial.id });
                }}
                isSelected = {selectedTicket === 3}
              />
            </Grid>
            <Grid item>
              <Ticket 
                name="Com Hotel"
                price={`+ R$ ${tickets.hotel.price}`}
                onSelect = {() => {
                  setSelectedTicket(4);
                  setUserOrder({ ...userOrder, total: 600, ticketId: tickets.hotel.id });
                }}
                isSelected = {selectedTicket === 4}
              />
            </Grid>
          </TicketList>
        </>
      )}

      {userOrder.total > 0 && (
        <>
          <ResumeOrder 
            total={userOrder.total} 
            onClick={() => setIsTicketChosen(true)}
          />
        </>
      )}
    </>
  );
}
const TicketList = styled(Grid)`
  margin-bottom: 20px !important;
`;
