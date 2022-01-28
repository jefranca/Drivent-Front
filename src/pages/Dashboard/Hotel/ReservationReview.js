import styled from "styled-components";
import Button from "../../../components/Form/Button";
import HotelReview from "../../../components/Hotel/HotelReview";

export default function ReservationReview({
  hotelReservationData,
  setHotelReservationData,
}) {
  return (
    <Container>
      <h2>Você já escolheu seu quarto</h2>
      <HotelReview hotelReservationData={hotelReservationData} />
      <ChangeButton onClick={() => setHotelReservationData(null)}>
        trocar de quarto
      </ChangeButton>
    </Container>
  );
}

const Container = styled.div`
  & > h2 {
    color: #8e8e8e;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 18px;
  }
`;

const ChangeButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 195px;
  border-radius: 4px;
  box-shadow: 0px 2px 10px 0px #00000040;
  background: #e0e0e0;
  font-family: Roboto;
  font-weight: 400;
  color: #000;
  @media(max-width: 600px){
    width: 100%;
    height: 50px;
  }
`;
