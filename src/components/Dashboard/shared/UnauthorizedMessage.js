import styled from "styled-components";

export default function UnauthorizedMessage({ children }) {
  return (
    <MessageContainer>
      <Message> {children} </Message>
    </MessageContainer>  
  );
}

const Message = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
`;

const MessageContainer = styled.div`
  margin: auto;
  max-width: 450px;
  width: 90%;
  height: calc(100% - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
