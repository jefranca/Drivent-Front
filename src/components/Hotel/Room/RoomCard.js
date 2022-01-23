import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { IoPersonOutline, IoPerson } from "react-icons/io5";
import HotelContext from "../../../contexts/HotelContext";

export default function RoomCard({ room }) {
  const [selected, setSelected] = useState(false);
  const { hotelData, setHotelData } = useContext(HotelContext);
  const roomPeople = roomPopulate(selected, room);

  let noVacancies = room.roomVacancies - room.occupiedVacancies;

  function toggleRoom() {
    let isSelect = room.id === hotelData.roomSelected?.id;
  }

  return (
    <Card>
      <span>{room.number}</span>
      <div>
        {roomPeople.map((people) =>
          people === "IoSelected" ? (
            <IoSelected />
          ) : people === "IoPerson" ? (
            <IoPerson />
          ) : (
            <IoPersonOutline />
          )
        )}
      </div>
    </Card>
  );
}

const Card = styled.div`
  background: ${({ selected }) => (selected ? "#FFEED2" : "#f1f1f1")};
  height: 45px;
  width: 190px;
  border-radius: 10px;
  font-family: "Roboto";
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
  margin-bottom: 15px;
  padding: 0 10px;
  span {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 700;
  }
`;

const IoSelected = styled(IoPerson)`
  color: #ff4791;
`;

function roomPopulate(isSelected, room) {
  let iconSelected = false;

  const array = Array.from({ length: room.roomVacancies }, (_, index) => {
    if (index >= room.ocuppiedVacancies) {
      if (isSelected && !iconSelected) {
        iconSelected = true;
        return "IoSelected";
      } else return "IoPersonOutline";
    } else {
      return "IoPerson";
    }
  });

  array.reverse();
  console.log(array);
  return array;
}
