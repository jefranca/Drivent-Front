import Title from "./Title";
import TicketType from "./TicketList";
import ResumeOrder from "./ResumeOrder";

export default function TicketSelection({
  reservationData,
  isOnline,
  setIsOnline,
  prices,
  value,
  reserveTicket,
  hasHotel,
  setHasHotel,
  tickets
}) {
  return (
    <>
      <Title text={"Ingressos e Pagamento"} />
      {reservationData ? (
        "Pagamento em desenvolvimento"
      ) : (
        <>
          {isOnline !== undefined ? (
            isOnline ? (
              <ResumeOrder value={value} reserveTicket={reserveTicket} />
            ) : (
              <>
                <TicketType
                  type={hasHotel}
                  setType={setHasHotel}
                  subTitle={"Ótimo! Agora escolha sua modalidade de hospedagem"}
                  names={["Sem Hotel", "Com Hotel"]}
                  prices={[0, prices?.Hotel]}
                />
                {hasHotel !== undefined ? (
                  <ResumeOrder value={value} reserveTicket={reserveTicket} />
                ) : null}
              </>
            )
          ) : null}
        </>
      )}
    </>
  );
}
