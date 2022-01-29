import CardInfo from "./CardInfo";
import styled from "styled-components";
import {
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
  IoEnterOutline,
} from "react-icons/io5";

const Card = ({ name, id, rooms, startsAt, endsAt, lastAt }) => {
  const start = dateToNumber(startsAt);
  const end = dateToNumber(endsAt);
  const last = dateToNumber(lastAt);
  const breakGapCompensation = (start - last) * 10;
  const breakCompensation = (start - last) * 80 + breakGapCompensation;
  console.log(id, rooms);
  const gapCompensation = (end - start - 1) * 10;
  const cardHeight = (end - start) * 80 + gapCompensation;
  const noVacancy = rooms === 0;
  const mockUserActivieId = 1;

  return (
    <Container height={cardHeight} marginTop={breakCompensation}>
      <CardInfo name={name} startsAt={startsAt} endsAt={endsAt} />
      <Division></Division>
      <InformationVacancies>
        <Information noVacancy={noVacancy} disabled={noVacancy}>
          {rooms > 0 ? (
            <>
              {id === mockUserActivieId ? (
                <>
                  <IoCheckmarkCircleOutline color="#078632" size={20} />
                  <p>Inscrito</p>
                </>
              ) : (
                <>
                  <IoEnterOutline color="#078632" size={20} />
                  <p> {rooms} vagas</p>
                </>
              )}
            </>
          ) : (
            <>
              <IoCloseCircleOutline color="#CC6666" size={20} />
              <p>Esgotado</p>
            </>
          )}
        </Information>
      </InformationVacancies>
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
  margin-right: 5px;
  border: 1px solid #cfcfcf;
`;

const InformationVacancies = styled.div`
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  cursor: ${({ disabled }) => (disabled ? "not-allow" : "pointer")};
  p {
    font-family: Roboto;
    font-size: 9px;
    font-weight: 400;
    margin-top: 5px;
    color: ${({ noVacancy }) => (noVacancy ? "#CC6666" : "#078632")};
  }
`;

export default Card;
