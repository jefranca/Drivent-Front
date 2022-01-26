import styled from "styled-components";
import RoomCard from "./RoomCard";

export default function RoomOptions({ rooms }) {
  return (
    <>
      <h2>Ótima pedida! Agora escolha seu quarto:</h2>
      <BoxRooms>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </BoxRooms>
    </>
  );
}

const BoxRooms = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 15px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
`;
