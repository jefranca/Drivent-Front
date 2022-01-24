import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { IoPersonOutline, IoPerson } from "react-icons/io5";
import HotelContext from "../../../contexts/HotelContext";

export default function RoomCard({ room }) {
  const [selected, setSelected] = useState(false);
  const { hotelData, setHotelData } = useContext(HotelContext);
  let noVacancies = room.roomVacancies === room.occupiedVacancies;

  useEffect(() => {
    if (hotelData.roomSelected?.id === room.id) {
      setSelected(true);
    } else setSelected(false);
  }, [hotelData]);

  function toggleRoom() {
    let isSelect = room.id === hotelData.roomSelected?.id;
    setSelected(!isSelect);
    setHotelData({ ...hotelData, roomSelected: isSelect ? null : room });
  }
  const roomPeople = roomPopulate(selected, room);

  return (
    <Card
      selected={selected}
      noVacancies={noVacancies}
      disabled={noVacancies}
      onClick={noVacancies ? null : toggleRoom}
    >
      <span>{room.number}</span>
      <div>
        {roomPeople.map((person, index) =>
          person === "IoSelected" ? (
            <IoSelected key={index} />
          ) : person === "IoPerson" ? (
            <IoPerson key={index} />
          ) : (
            <IoPersonOutline key={index} />
          )
        )}
      </div>
    </Card>
  );
}

const Card = styled.div`
  background: ${({ selected, noVacancies }) =>
    noVacancies ? "#E9E9E9" : selected ? "#FFEED2" : "#fff"};
  height: 45px;
  width: 190px;
  font-family: "Roboto";
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
  margin-bottom: 15px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid #cecece;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  span {
    color: ${(noVacancies) => (noVacancies ? "#454545" : "#000")};
    font-size: 20px;
    font-weight: 700;
  }
  svg {
    width: 22px;
    height: 22px;
  }
`;
const IoSelected = styled(IoPerson)`
  color: #ff4791;
`;

function roomPopulate(isSelected, room) {
  let iconSelected = false;
  const array = Array.from({ length: room.roomVacancies }, (_, index) => {
    if (index >= room.occupiedVacancies) {
      if (!iconSelected && isSelected) {
        iconSelected = true;
        return "IoSelected";
      } else {
        return "IoPersonOutline";
      }
    }
    return "IoPerson";
  });
  array.reverse();
  return array;
}
