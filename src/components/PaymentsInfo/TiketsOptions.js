import styled from "styled-components";

export default function TicketsOptions({ ticketOption, select }) {
  return (
    <Option
      border = {select? "#FFEED2" :  "1px solid #cecece" }
      selected = {select}
    >
      {ticketOption}
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
  border: ${p => p.border};
  color: #454545;
  font-family: "Roboto", Sans-serif;
  background-color: ${p => p.selected ? "#FFEED2" : ""};
  cursor: pointer;
  span {
    margin-top: 10px;
    color: #898989;
    font-size: 14px;
  }
`;
