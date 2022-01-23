import styled from "styled-components";

export default function TicketsOptions({ ticketOption, type, setType, setTypeTo, price }) {
  let border;
  if(type === undefined || !type) {
    border = "1px solid #cecece";
  } else {
    border = "#FFEED2";
  }
  return (
    <Option
      onClick={() => setType(setTypeTo)}
      border={border}
      type={type}
    >
      {ticketOption}
      <span>R$ {price}</span>
    </Option>
  );
}

const Option = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 140px;
  border-radius: 20px;
  border: ${(p) => p.border};
  color: #454545;
  font-family: "Roboto", Sans-serif;
  background-color: ${(p) => p.type === undefined ? "": p.type ? "#FFEED2" : ""};
  cursor: pointer;
  span {
    margin-top: 10px;
    color: #898989;
    font-size: 14px;
  }
`;
