import styled from "styled-components";
import ButtonDay from "./ButtonDay";

export default function ActivitiesDays({ dates, setDay, day, weekDay }) {
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
        />
      ))}
    </DaysMenu>
  );
}

const DaysMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 10px;
  width: 100%;
`;
