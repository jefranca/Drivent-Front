import styled from "styled-components";
import TableTitle from "./TableTitle";

const TableTitles = ({ titles }) => {
  return (
    <TitlesContainer>
      {titles.map((title, i) => (
        <TableTitle key={i}>
          {title}
        </TableTitle>
      ))}
    </TitlesContainer>
  );
};

const TitlesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
`;

export default TableTitles;
