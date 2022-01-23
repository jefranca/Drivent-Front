import UnauthorizedMessage from "../../../components/Dashboard/shared/UnauthorizedMessage";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import useApi from "../../../hooks/useApi";
import HotelOptions from "../../../components/Hotel/HotelOptions";
import HotelContext from "../../../contexts/HotelContext";
import RoomOptions from "../../../components/Hotel/Room/RoomOptions";

export default function Hotel() {
  const { userData } = useContext(UserContext);
  const { hotelData, setHotelData } = useContext(HotelContext);
  const [hotels, setHotels] = useState(null);
  const [hotelSelected, setHotelSelected] = useState(null);
  const api = useApi();

  useEffect(() => {
    if (hotelData) {
      setHotelSelected(true);
      return;
    }
    setHotelSelected(false);
  }, [hotelData]);

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

  //console.log(hotelData);

  function makeReservation() {
    console.log("apertou");
    api.hotel
      .makeReservation(hotelData.id, hotelData.roomSelected.id)
      .then(() => {
        console.log("salvooo");
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
      {hotelData ? <RoomOptions rooms={hotelData.rooms} /> : ""}
      {hotelData?.roomSelected ? (
        <Button onClick={makeReservation}>RESERVAR QUARTO</Button>
      ) : (
        ""
      )}
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

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 185px;
  border-radius: 4px;
  box-shadow: 0px 2px 10px 0px #00000040;
  background: #e0e0e0;
  font-family: Roboto;
  font-weight: 400;
  color: #000;
`;
