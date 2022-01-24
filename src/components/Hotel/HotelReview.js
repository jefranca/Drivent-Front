import styled from "styled-components";

export default function HotelReview({ hotelReservationData }) {
  return (
    <Card>
      <img
        src={hotelReservationData?.hotel?.image}
        alt={hotelReservationData?.hotel?.name}
      />
      <h1>{hotelReservationData?.hotel?.name}</h1>
      <Drescribe>
        <Title>Quarto reservado</Title>
        <span>
          {`${hotelReservationData?.room?.number} (${hotelReservationData?.roomType})`}{" "}
        </span>
      </Drescribe>
      <Drescribe>
        <Title>Pessoas no seu quarto</Title>
        {hotelReservationData?.othersInRoom === 0 ? (
          <span>Somente você</span>
        ) : (
          <span>Você e mais {hotelReservationData?.othersInRoom}</span>
        )}
      </Drescribe>
    </Card>
  );
}

const Card = styled.div`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  padding: 15px;
  font-family: "Roboto";
  background-color: #ffeed2;
  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }
  h1 {
    font-size: 20px;
    line-height: 23px;
    margin-top: 10px;
  }
`;

const Drescribe = styled.div`
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
