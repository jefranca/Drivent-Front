import styled from "styled-components";

export default function ActivitiesDays() {
  const activitiesDays = ["Sexta, 22/10", "Sábado, 23/10", "Domingo, 24/10"];
  return (
    <DaysMenu>
      {activitiesDays.map((activityDay) => (
        <DayButton>{activityDay}</DayButton>
      ))}
    </DaysMenu>
  );
}

const DaysMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const DayButton = styled.div`
  display: flex;
  margin-right: 20px ;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 4px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
`;
