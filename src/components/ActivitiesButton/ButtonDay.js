import styled from "styled-components";

export default function ButtonDay({ date, setDay, day, select, weekDay, index, isButtonDisabled, setIsButtonDisabled }) {
  const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const checker = [select, day];
  return (
    <DayButton
      disabled= {isButtonDisabled}
      onClick={() => {
        setIsButtonDisabled(true);
        setDay(date);
        setInterval(() => {setIsButtonDisabled(false);}, 1000);
      }}
      checker={checker}
    >
      {weekdays[weekDay[index]]}, {date}
    </DayButton>
  );
}

const DayButton = styled.button`
  display: flex;
  margin-right: 18px;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  background-color: ${(props) =>
    props.checker[0] === props.checker[1] ? "#ffd37d" : "#e0e0e0"};
  border-radius: 4px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  border: none;
  cursor: pointer;
`;
