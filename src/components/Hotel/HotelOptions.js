import styled from "styled-components";
import HotelCard from "./HotelCard";

export default function HotelOptions({ hotels }) {
  return (
    <BoxHotels>
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </BoxHotels>
  );
}

const BoxHotels = styled.div`
  padding-bottom: 10px;
  width: 100%;
  display: grid;
  overflow-x: auto;
  grid-auto-columns: 190px;
  grid-auto-flow: column;
  column-gap: 30px;
  margin-bottom: 10px;
`;
