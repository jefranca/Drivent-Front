import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import confirmIcon from "../../assets/icons/confirm.svg";

export const Confirmation = () => {
  return (
    <ConfirmationBody>
      <ConfirmIcon src={confirmIcon} />

      <MessageContainer>
        <Typography  style={{ fontWeight: 600 }}>
          Pagamento confirmado!
        </Typography>
        <Typography>
          Prossiga para escolha de hospedagem e atividades
        </Typography>
      </MessageContainer>
      
    </ConfirmationBody>
  );
};

const ConfirmationBody = styled.div`
  display: flex;
`;

const MessageContainer = styled.div`
  margin-left: 14px; 
`;

const ConfirmIcon = styled.img`
  height: 80%;
`;

