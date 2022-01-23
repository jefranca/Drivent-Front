import styled from "styled-components";

export default function HotelCard({ hotel }) {
  return (
    <Card>
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
