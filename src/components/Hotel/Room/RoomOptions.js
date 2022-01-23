import styled from "styled-components";
import RoomCard from "./RoomCard";

export default function RoomOptions({ rooms }) {
  return (
    <>
      <h2>Ótima pedida! Agora escolha seu quarto:</h2>
      <BoxRooms>
        {rooms.map((room) => (
          <RoomCard room={room} />
        ))}
      </BoxRooms>
    </>
  );
}

const BoxRooms = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
`;
