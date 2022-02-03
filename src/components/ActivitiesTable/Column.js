import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const Column = ({ title, children, index }) => {
  return (
    <Container>
      <ColumnTitle>{title}</ColumnTitle>
      <ColumContent index={index}>{children}</ColumContent>
    </Container>
  );
};

const Container = styled.div``;

const ColumContent = styled.div`
  padding: 0 14px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  border-top: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  border-left: ${({ index }) => (index === 0 ? "1px solid #D7D7D7" : "")};
  @media (max-width: 600px) {
    border-left: 1px solid #d7d7d7;
  }
`;

const ColumnTitle = styled(Typography)`
  text-align: center;
  color: #838383;
  @media (max-width: 600px) {
    padding-top: 5px;
  }
`;

export default Column;
