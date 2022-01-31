import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { AiFillLock } from "react-icons/ai";

export const SecureMessage = () => {
  return (
    <MessageBody>
      <LockIcon />
      <Message>
         O nosso site utiliza o protocolo de encriptação SSL. Seu pagamento está seguro!
      </Message>
    </MessageBody>
  );
};

const LockIcon = styled(AiFillLock)`
  font-size: 20px;
  width: 30px;
  margin: 0 4px;
  color: green;
`;

const MessageBody = styled.p`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 40px;
  padding: 10px;
  background: #FFEED2;
  border-radius: 10px;
`;

const Message = styled(Typography)`
  color: #000000;
  font-size: 14px !important;
`;
