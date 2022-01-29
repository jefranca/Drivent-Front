import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const CardInfo = ({ name, startsAt, endsAt }) => {
  return (
    <Container>
      <CardTitle> {name} </CardTitle>
      <CardTime>
        {startsAt} - {endsAt}
        aa
      </CardTime>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
`;

const CardTitle = styled(Typography)`
  font-weight: bold !important;
  font-size: 12px !important;
`;

const CardTime = styled(Typography)`
  font-size: 12px !important;
`;

export default CardInfo;
