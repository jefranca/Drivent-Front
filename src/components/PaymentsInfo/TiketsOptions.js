import styled from "styled-components";

export default function TicketsOptions({ ticketOption }) {
  return (
    <Option>
      {ticketOption[0]}
      <span>R$ 250</span>
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
  border: 1px solid #cecece;
  color: #454545;
  font-family: "Roboto", Sans-serif;
  span {
    margin-top: 10px;
    color: #898989;
    font-size: 14px;
  }
`;
