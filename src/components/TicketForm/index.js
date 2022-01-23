import styled from "styled-components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";
import SubTitle from "./SubTitle";

import ResumeOrder from "./ResumeOrder";
import Grid from "@material-ui/core/Grid";
import Ticket from "./Ticket";

export default function PaymentInfo() {
  const { ticket, reservation } = useApi();

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(0);

  const [userOrder, setUserOrder] = useState({
    isOnline: true,
    total: 0,
  });

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
      <SubTitle text={"Primeiro, escolha sua modalidade de ingresso"} />
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
              setUserOrder({ ...userOrder, isOnline: false, total: 0 });
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
              setUserOrder({ ...userOrder, isOnline: true, total: 100 });
            }}
            isSelected = {selectedTicket === 1}
          />
        </Grid>
      </TicketList>

      {!userOrder.isOnline && (
        <>
          <SubTitle text={"Ótimo! Agora escolha sua modalidade de hospedagem"} />
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
                  setUserOrder({ ...userOrder, total: 250 });
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
                  setUserOrder({ ...userOrder, total: 600 });
                }}
                isSelected = {selectedTicket === 4}
              />
            </Grid>
          </TicketList>
        </>
      )}
      
      {userOrder.total > 0 && (
        <ResumeOrder total={userOrder.total} />
      )}
    </>
  );
}
const TicketList = styled(Grid)`
  margin-bottom: 20px !important;
`;
