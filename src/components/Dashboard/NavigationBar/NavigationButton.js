import styled from "styled-components";

export default function NavigationButton({
  active,
  children,
  onClick,
  width,
  desktop,
  mobile,
}) {
  return (
    <Button active={active} onClick={onClick} width={width} desktop={desktop} mobile={mobile} >
      {children}
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  height: 100px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${(props) => (props.active ? "background-color: #ccc;" : "")}

  &:hover {
    background-color: #ccc;
  }

  & > *:not(:last-child) {
    margin-bottom: 4px;
  }

  & > *:first-child {
    font-size: 28px;
    color: #124090;
  }
  ${({ mobile }) => mobile ? 
    " display: none;"
    : ""}

  @media (max-width: 600px) {
    height: 80px;
    
    width: ${({ width }) => width || "80px"} !important;
    ${({ desktop }) => desktop ? `
     display: none;
    `: ""}
    ${({ mobile }) => mobile ? 
    ` display:block;
      margin-top: 20px;
      position: absolute;
      top: 0;
      left: 80%;
      z-index: 1;`
    : ""}
  }
`;
