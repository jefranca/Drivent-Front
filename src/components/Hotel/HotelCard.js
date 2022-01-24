import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import HotelContext from "../../contexts/HotelContext";

export default function HotelCard({ hotel }) {
  const { hotelData, setHotelData } = useContext(HotelContext);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (hotelData?.id === hotel.id) {
      setSelected(true);
      return;
    }
    setSelected(false);
  }, [hotelData]);

  function toggleHotel() {
    if (hotelData?.id === hotel.id) {
      setHotelData(null);
      return;
    }
    setHotelData({ ...hotel, roomSelected: null });
  }

  return (
    <Card onClick={toggleHotel} selected={selected}>
      <img src={hotel.image} alt="hotel" />
      <h3>{hotel.name}</h3>
      <Description>
        <Title>Tipos de acomodação:</Title>
        <span>{typesOfRooms(hotel)}</span>
      </Description>
      <Description>
        <Title>Vagas disponíveis: </Title>
        <span>{hotel.totalVacancies}</span>
      </Description>
    </Card>
  );
}

const Card = styled.div`
  background: ${({ selected }) => (selected ? "#FFEED2" : "#f1f1f1")};
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
  flex-wrap: wrap;
  width: 140px;
  margin-top: 12px;
  color: #3c3c3c;
`;

const Title = styled.span`
  font-weight: 700;
  margin-bottom: 2px;
  margin-right: 5px;
`;

function typesOfRooms(hotel) {
  const { RoomTypes } = hotel;

  if (RoomTypes.length === 2) {
    return `${RoomTypes[0]}, ${RoomTypes[1]}`;
  }
  if (RoomTypes.length === 3) {
    return `${RoomTypes[0]}, ${RoomTypes[1]} e ${RoomTypes[2]}`;
  }

  return RoomTypes[0];
}
