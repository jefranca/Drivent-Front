import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const TableTitle = ({ children }) => {
  return (
    <CenteredTitle variant="h6">
      {children}
    </CenteredTitle>
  );
};

const CenteredTitle = styled(Typography)`
  text-align: center;
  color: #838383;
`;

export default TableTitle;
