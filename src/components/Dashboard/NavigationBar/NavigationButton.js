import styled from "styled-components";

export default function NavigationButton({ active, children, onClick, width, desktop }) {
  return (
    <Button active={active} onClick={onClick} width={width} desktop={desktop}>
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
  ${props => props.active ? "background-color: #ccc;" : ""}

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

  @media (max-width: 600px) {
    height: 80px;
    width: ${({ width }) => width || "100%"} !important;
    ${({ desktop }) => desktop? `
      display: none;
    `: ""}
  }
`;
