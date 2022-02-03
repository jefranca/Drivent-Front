import { useState } from "react";
import styled from "styled-components";
import ButtonDay from "./ButtonDay";

export default function ActivitiesDays({ dates, setDay, day, weekDay }) {
  const [isButtonDisabled, setIsButtonDisabled]= useState(false);
  return (
    <DaysMenu>
      {dates.map((date, index) => (
        <ButtonDay
          key={index}
          select={date}
          setDay={setDay}
          day={day}
          date={date}
          weekDay={weekDay}
          index={index}
          isButtonDisabled={isButtonDisabled}
          setIsButtonDisabled={setIsButtonDisabled}
        />
      ))}
    </DaysMenu>
  );
}

const DaysMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 40px;
  width: 100%;
`;
