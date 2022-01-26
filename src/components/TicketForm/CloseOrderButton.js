import styled from "styled-components";

export default function CloseOrderButton({ text, onClick }) {
  return <Button onClick={onClick}>{text}</Button>;
}

const Button = styled.div`
  width: 162px;
  height: 37px;
  margin-top: 17px;
  border-radius: 4px;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  cursor: pointer;
  @media(max-width: 600px) {
    width: 100%;
    height: 50px;
  }
`;
