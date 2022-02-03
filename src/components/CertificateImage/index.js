import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import signature from "../../assets/images/signature.png";

export default function Certificate({ name, event, year, startDay, startMonth, endDay, endMonth, type, hours, imgSrc, border }) {
  const months = { 
    1: "Janeiro",
    2: "Fevereiro", 
    3: "Março", 
    4: "Abril", 
    5: "Maio", 
    6: "Junho", 
    7: "Julho", 
    8: "Agosto", 
    9: "Setembro", 
    10: "Outubro", 
    11: "Novembro",
    12: "Dezembro" 
  };

  console.log(border);
  return (
    <MarginWrap border={border}>
      <Container>
        <Title variant="h5"> CERTIFICADO DE PARTICIPAÇÃO </Title>
        <Name variant="h5"> {name} </Name>
        <Separator />
        <Description>
          Participou do {event} {year} do dia {startDay} de {months[startMonth]} a {endDay} de {months[endMonth]} na modalidade {type}. Contabilizando {hours} horas. 
        </Description>
        <BottomLine>
          <EmitedDate>
            Rio de Janeiro, {endDay} de {endMonth} {year}
          </EmitedDate>
          <LogoContainer>
            <Logo src={imgSrc} alt={event}/>
          </LogoContainer>
          <Signature src={signature} alt={event}/>
        </BottomLine>
      </Container>
    </MarginWrap>
  );
}

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Signature = styled.img`
  width: 100%;
`;

const Logo = styled.img`
  width: 40%;
  max-width: 80px;
`;

const BottomLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 50px;
  width: 100%;
  align-items: center
`;

const EmitedDate = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 200px;
  color: #8e8e8e;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 30px;
`;

const MarginWrap = styled.div`
  background: ${({ border }) => border};
  padding: 20px;
`;

const Title = styled(Typography)`
  margin-bottom: 10px !important;
  text-align: center;
  font-weight: bold !important;
`;

const Name = styled(Typography)`
  margin-top: 50px !important;
  text-align: center;
  font-weight: bold !important;
`;

const Description = styled(Typography)`
  margin-top: 20px !important;
  text-align: center;
  font-weight: bold !important;
  color: #8e8e8e;
`;

const Separator = styled.div`
  height: 1px;
  width: 90%;
  background: #8e8e8e;
`;
