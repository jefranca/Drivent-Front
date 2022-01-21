import styled from "styled-components";

export const FormWrapper = styled.form`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  
  > div {
    width: calc(100% - 320px);
  }

  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;
