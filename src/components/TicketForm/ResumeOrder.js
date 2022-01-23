import styled from "styled-components";

import CloseOrderButton from "./CloseOrderButton";

export default function ResumeOrder({ value, reserveTicket }) {
  return (
    <>
      <Resume>
        Fechado! O total ficou em <span>R$ {value}.</span> Agora é só confirmar:
      </Resume>
      <CloseOrderButton text={"RESERVAR INGRESSO"} onClick={reserveTicket} />
    </>
  );
}

const Resume = styled.div`
  font-size: 20px;
  color: #8e8e8e;
  font-family: "Roboto", sans-serif;
  margin-top: 44px;
  span {
    font-weight: bold;
  }
`;
