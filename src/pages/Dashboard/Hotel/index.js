/* eslint-disable no-console */
import UnauthorizedMessage from "../../../components/Dashboard/shared/UnauthorizedMessage";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { useContext, useRef } from "react";
import UserContext from "../../../contexts/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import useApi from "../../../hooks/useApi";
import HotelOptions from "../../../components/Hotel/HotelOptions";
import HotelContext from "../../../contexts/HotelContext";
import RoomOptions from "../../../components/Hotel/Room/RoomOptions";
import HotelReservationContext from "../../../contexts/HotelReservationContext";
import ReservationReview from "./ReservationReview";
import { toast } from "react-toastify";
import Button from "../../../components/Form/Button";

export default function Hotel() {
  const { userData } = useContext(UserContext);
  const { hotelData, setHotelData } = useContext(HotelContext);
  const { hotelReservationData, setHotelReservationData } = useContext(
    HotelReservationContext
  );
  const [hotels, setHotels] = useState(null);
  const hotelRef = useRef();
  const api = useApi();

  useEffect(() => {
    getReservation();
    const actualHotelData = hotels?.find(
      (hotel) => hotel?.id === hotelData?.id
    );
    if (actualHotelData) {
      setHotelData({
        ...actualHotelData,
        roomSelected: hotelData.roomSelected,
      });
    }
  }, [hotels]);

  useEffect(() => {
    api.hotel
      .getAllHotels()
      .then((response) => {
        setHotels(response.data);
        getReservation();
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(hotelData);
  function getReservation() {
    api.hotel.getHotelReservation(userData.user.id).then((response) => {
      setHotelReservationData(response.data);
    });
  }

  function makeReservation() {
    api.hotel
      .makeReservation(hotelData.id, hotelData.roomSelected.id)
      .then(() => {
        toast("Hotel reserved");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Container ref={hotelRef}>
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

      {hotelReservationData ? (
        <ReservationReview
          hotelReservationData={hotelReservationData}
          setHotelReservationData={setHotelReservationData}
        />
      ) : (
        <>
          <h2>Primeiro, escolha seu hotel</h2>
          {hotels ? <HotelOptions hotels={hotels} /> : ""}
          {hotelData ? <RoomOptions rooms={hotelData.rooms} /> : ""}{" "}
          {hotelData?.roomSelected ? (
            <ChangeButton onClick={makeReservation}>
              RESERVAR QUARTO
            </ChangeButton>
          ) : (
            ""
          )}
        </>
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

const ChangeButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 195px;
  border-radius: 4px;
  box-shadow: 0px 2px 10px 0px #00000040;
  background: #e0e0e0;
  font-family: Roboto;
  font-weight: 400;
  color: #000;
`;
