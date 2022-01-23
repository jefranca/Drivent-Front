import UnauthorizedMessage from "../../../components/Dashboard/shared/UnauthorizedMessage";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import useApi from "../../../hooks/useApi";
import HotelOptions from "../../../components/Hotel/HotelOptions";

export default function Hotel() {
  const { userData } = useContext(UserContext);

  const [hotels, setHotels] = useState(null);
  const api = useApi();
  useEffect(() => {
    api.hotel
      .getAllHotels()
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <StyledTypography variant="h4">
        Escolha de hotel e quarto
      </StyledTypography>
      {/*userData.isPaid ? (
        <>Em breve!</>
      ) : (
        <UnauthorizedMessage>
          Você precisa completar o pagamento antes de prosseguir pra escolha de
          ingresso
        </UnauthorizedMessage>
      )*/}

      <h2>Primeiro, escolha seu hotel</h2>
      {hotels ? <HotelOptions hotels={hotels} /> : ""}
    </Container>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const Container = styled.div`
  font-family: "Roboto";
  & > h2 {
    color: #8e8e8e;
    font-size: 20px;
    margin-bottom: 18px;
  }
`;

const BoxHotels = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  overflow-x: auto;
`;

const HotelCard = styled.div`
  background: #f1f1f1;
  height: 265px;
  width: 196px;
  border-radius: 10px;
  font-family: "Roboto";
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin-right: 20px;
  padding: 18px 14px;
  img {
    height: 110px;
    width: 170px;
    border-radius: 5px;
  }
  & > h3 {
    font-size: 20px;
    font-weight: 400;
    color: #343434;
  }
`;

const Description = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  color: #3c3c3c;
`;

const Title = styled.span`
  font-weight: 700;
  margin-bottom: 2px;
`;
const RoomCard = styled.div``;
