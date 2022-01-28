import CardInfo from "./CardInfo";
import styled from "styled-components";

const Card = ({ name, startsAt, endsAt, lastAt }) => {
  const start = dateToNumber(startsAt);
  const end = dateToNumber(endsAt);
  const last = dateToNumber(lastAt);

  const breakGapCompensation = (start - last) * 10;
  const breakCompensation = (start - last) * 80 + breakGapCompensation;

  const gapCompensation = (end - start - 1) * 10;
  const cardHeight = (end - start) * 80 + gapCompensation;

  return (
    <Container
      height={cardHeight}
      marginTop={breakCompensation}
    >
      <CardInfo 
        name={name}
        startsAt={startsAt}
        endsAt={endsAt}
      />
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
  background: #F1F1F1;
  border: 1px solid #FFFFFF;
  border-radius: 5px;
`;

export default Card;
