import TicketsOptions from "./TiketsOptions";
import SubTitle from "./SubTitle";

export default function TicketType() {
  return (
    <>
      <SubTitle text={"Primeiro, escolha a modalidade do ingresso"} />
      <TicketsOptions ticketOption={["Presencial", "Online"]} />
    </>
  );
}
