import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

export const Ticket = ({ type, value }) => {
  return (
    <TicketBody>
      <Type>
        {type}
      </Type>
      <Value>
        R$
        {" "}
        {value}
      </Value>
    </TicketBody>
  );
};

const TicketBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 290px;
  height: 108px;
  margin-bottom: 20px;

  background: #FFEED2;
  border-radius: 20px;
`;

const Type = styled(Typography)`
  margin-bottom: 10px !important;
  color: #00000;
`;

const Value = styled(Typography)`
  color: #898989
;
`;
