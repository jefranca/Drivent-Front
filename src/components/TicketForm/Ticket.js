import styled from "styled-components";

export default function Ticket({ price, name, onSelect, isSelected }) {
  const handleClick = () => {
    onSelect();
  };

  return (
    <Option

      isSelected={isSelected}
      onClick={() => handleClick()}
    >
      { name }
      <span>{ price }</span>
    </Option>
  );
}

const Option = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 140px;
  border-radius: 20px;
  color: #454545;
  font-family: "Roboto", Sans-serif;
  background-color: ${({ isSelected }) => isSelected ? "#FFEED2": "#fff" };
  border: ${({ isSelected }) => isSelected ? "none": "1px solid #cecece" };

  cursor: pointer;
  span {
    margin-top: 10px;
    color: #898989;
    font-size: 14px;
  }
`;
