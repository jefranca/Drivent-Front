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
    width: calc(100% - 350px);
    margin-right: 30px;
  }

  @media (max-width: 750px) {
    > div {
      margin: auto;
    }

  @media (max-width: 750px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;
