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
  color: #8e8e8e;
`;

const MessageContainer = styled.div`
  margin: auto;
  max-width: 500px;
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
