import CardInfo from "./CardInfo";
import styled from "styled-components";
import {
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
  IoEnterOutline,
} from "react-icons/io5";

const Card = ({ name, startsAt, endsAt, lastAt, rooms }) => {
  const start = dateToNumber(startsAt);
  const end = dateToNumber(endsAt);
  const last = dateToNumber(lastAt);
  console.log(rooms);
  const breakGapCompensation = (start - last) * 10;
  const breakCompensation = (start - last) * 80 + breakGapCompensation;

  const gapCompensation = (end - start - 1) * 10;
  const cardHeight = (end - start) * 80 + gapCompensation;

  return (
    <Container height={cardHeight} marginTop={breakCompensation}>
      <CardInfo name={name} startsAt={startsAt} endsAt={endsAt} />
      <Division></Division>
      <InformationVacancies>{rooms}</InformationVacancies>
    </Container>
  );
};

const dateToNumber = (time) => {
  const hours = Number(time.split(":")[0]);
  const minutes = Number(time.split(":")[1]) / 60;

  return hours + minutes;
};

const Container = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: ${({ height }) => height}px;
  margin-top: ${({ marginTop }) => marginTop}px;
  background: #f1f1f1;
  border: 1px solid #ffffff;
  border-radius: 5px;
  display: flex;
`;

const Division = styled.div`
  height: 100%;
  width: 0px;
  margin-right: 10px;
  border: 1px solid #cfcfcf;
`;

const InformationVacancies = styled.div`
  height: 100%;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Card;
