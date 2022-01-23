import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";
import UnauthorizedMessage from "../Dashboard/shared/UnauthorizedMessage";

import TicketSelection from "./TicketSelection.js";

export default function PaymentInfo() {
  const { ticketPrice, enrollment, reservation } = useApi();
  const [enrollmentData, setEnrollmentData] = useState();
  const [hasHotel, setHasHotel] = useState();
  const [isOnline, setIsOnline] = useState();
  const [prices, setPrices] = useState();
  const [reservationData, setReservationData] = useState();
  const [value, setValue] = useState(0);

  useEffect(() => {
    reservation.getReservationInfo().then((res) => {
      setReservationData(res.data);
      if (res.data) {
        setIsOnline(!res.data.ticket.isInPerson);
        setHasHotel(res.data.ticket.hasHotel);
      }
    });
    ticketPrice
      .getTicketPrice()
      .then((res) => {
        setPrices(res.data);
      })
      .catch(() => {
        toast("Algo está errado");
      });
    enrollment.getPersonalInformations().then((res) => {
      if (res.status !== 200) {
        setEnrollmentData({});
        return;
      }
      setEnrollmentData(res.data);
    });
  }, []);

  useEffect(() => {
    if (isOnline) {
      setValue(prices?.Online);
    } else {
      setValue(prices?.Presencial);
      if (hasHotel) {
        setValue(prices?.Presencial + prices?.Hotel);
      }
    }
  }, [isOnline, hasHotel, prices]);

  if (!enrollmentData) return "Carregando . . .";
  if (!enrollmentData.address)
    return (
      <UnauthorizedMessage>
        Você precisa completar sua inscrição antes de prosseguir pra escolha de
        ingresso
      </UnauthorizedMessage>
    );

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

  const ticketSelectionObj = {
    reservationData,
    isOnline,
    setIsOnline,
    prices,
    value,
    reserveTicket,
    hasHotel,
    setHasHotel,
  };

  return (
    <>
      {reservationData ? (
        <>Aqui vai o component para o pagamento</>
      ) : (
        <TicketSelection {...ticketSelectionObj} />
      )}
    </>
  );

  // return <TicketSelection />;
}
