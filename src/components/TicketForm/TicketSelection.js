import Title from "./Title";
import TicketType from "./TicketType";
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
}) {
  return (
    <>
      <Title text={"Ingressos e Pagamento"} />
      {reservationData ? (
        "Pagamento em desenvolvimento"
      ) : (
        <>
          <TicketType
            type={isOnline}
            setType={setIsOnline}
            subTitle={"Primeiro, escolha a modalidade do ingresso"}
            names={["Presencial", "Online"]}
            prices={[prices?.Presencial, prices?.Online]}
          />
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
