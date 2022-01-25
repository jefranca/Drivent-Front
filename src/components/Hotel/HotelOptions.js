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
  height: 300px;
  width: 100%;
  display: flex;
  overflow: none;
  margin-bottom: 20px;
`;
