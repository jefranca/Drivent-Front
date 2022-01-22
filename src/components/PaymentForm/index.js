import { useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

import styled from "styled-components";
import { toast } from "react-toastify";
import Typography from "@material-ui/core/Typography";

import { useForm } from "../../hooks/useForm";

import Input from "../Form/Input";
import Button from "../Form/Button";
import { FormWrapper } from "./FormWrapper";
import { InputWrapper } from "./InputWrapper";
import { ErrorMsg } from "./ErrorMsg";
import FormValidations from "./FormValidations";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import { Ticket } from "./Ticket";
import { Confirmation } from "./Confirmation";

export default function PaymentForm() {
  const { userData, setUserData } = useContext(UserContext);
  const ticketTypes = {
    0: "Presencial",
    1: "Presencial + Com Hotel",
    2: "Online"
  };
  const ticketType = ticketTypes[userData.subscription.type];

  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);
  
  const {
    handleSubmit,
    handleChange,
    data,
    errors,
  } = useForm({
    validations: FormValidations,

    onSubmit: () => {
      toast("Pago com sucesso!");
      setUserData((userData) => ({
        ...userData,
        subscription: {
          ...userData.subscription,
          isPaid: true,
        }
      }));
    },

    initialValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focus: ""
    },
  });

  const handleChangeSelection = (key) => (e) => {
    const focus = {
      target: {
        value: key
      }
    };

    handleChange("focus")(focus);
  };

  return (
    <PaymentContainer>
      <SubTitle variant="h6"> Ingresso </SubTitle>
      <Ticket 
        type={ticketType}
        value={userData.subscription.price}
      />
      <SubTitle variant="h6"> Pagamento </SubTitle>
      {!userData.subscription.isPaid ? (
        <FormWrapper onSubmit={handleSubmit}>
          <ContainerCard>

            <Cards
              cvc={data.cvc}
              expiry={data.expiry}
              focused={data.focus}
              name={data.name}
              number={data.number}
            />
          </ContainerCard>

          <ContainerFields>
            <InputWrapper>
              <Input
                label="Card Number"
                name="number"
                type="text"
                style = {{ width: "100%" }}
                maxLength = "20"
                mask="9999 9999 9999 9999"
                value={data.number || ""}
                onChange={handleChange("number")}
                onSelect={handleChangeSelection("number")}
              />
              {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
            </InputWrapper>
            <InputWrapper>
              <Input
                label="Name"
                name="name"
                type="text"
                style = {{ width: "100%" }}
                value={data.name || ""}
                onChange={handleChange("name")}
                onSelect={handleChangeSelection("name")}
              />
              {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
            </InputWrapper>

            <MultiInputWrapper>
              <InputWrapper>
                <Input
                  label="Valid Thru"
                  name="expiry"
                  type="text"
                  style = {{ width: "100%" }}
                  mask="19/99"
                  formatChars= {{
                    "1": "[0-1]",
                    "9": "[0-9]",
                  }}
                  value={data.expiry || ""}
                  onChange={handleChange("expiry")}
                  onSelect={handleChangeSelection("expiry")}
                />
                {errors.expiry && <ErrorMsg>{errors.expiry}</ErrorMsg>}
              </InputWrapper>

              <InputWrapper
                width="50%"
              >
                <Input
                  label="CVC"
                  mask="999"
                  name="cvc"
                  type="text"
                  style = {{ width: "90%", marginLeft: "10%" }}
                  value={data.cvc || ""}
                  onChange={handleChange("cvc")}
                  onSelect={handleChangeSelection("cvc")}
                />
                {errors.cvc && <ErrorMsg>{errors.cvc}</ErrorMsg>}
              </InputWrapper>
            </MultiInputWrapper>
          </ContainerFields>

          <SubmitContainer>
            <Button type="submit" disabled={dynamicInputIsLoading}>
            Finalizar Pagamento
            </Button>
          </SubmitContainer>
        </FormWrapper>
      ) : (
        <Confirmation />
      )}

    </PaymentContainer>

  );
}

const SubTitle = styled(Typography)`
  margin-bottom: 20px !important;
  color: #8E8E8E;

`;

const SubmitContainer = styled.div`
  margin-top: 40px!important;
  width: 100%!important;

  > button {
    margin-top: 0 !important;
  }
`;

const MultiInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-around;
`;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerFields = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 750px) {
    width: 100% !important;
  }
`;

const ContainerCard = styled.div`
  display: flex;
  justify-content: flex-start !important;
  align-items: flex-start !important;
  width: 290px !important;

  @media (max-width: 750px) {
    display: none;
  }

  @media (max-width: 600px) {
    display: flex;
    margin-bottom: 10px !important;
  }
`;
