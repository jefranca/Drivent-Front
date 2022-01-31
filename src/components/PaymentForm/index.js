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
import FormValidations from "./FormValidations";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import { Ticket } from "./Ticket";
import { Confirmation } from "./Confirmation";

import useApi from "../../hooks/useApi";

export default function PaymentForm({ userOrder }) {
  const { userData, setUserData } = useContext(UserContext);
  const { reservation } = useApi();
  const ticketTypes = {
    1: "Presencial",
    2: "Online",
    3: "Presencial + Com Hotel",
  };
  const ticketType = ticketTypes[userOrder.ticketId];

  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: FormValidations,

    onSubmit: () => {
      setDynamicInputIsLoading(true);
      reservation
        .postNewReservation({ ticketId: userOrder.ticketId })
        .then((res) => {
          setDynamicInputIsLoading(false);
          toast("Pago com sucesso!");
          setUserData((userData) => ({
            ...userData,
            ticket: {
              ...res.data,
            },
          }));
        })
        .catch((error) => {
          setDynamicInputIsLoading(false);
          toast("Erro ao realizar o pagamento.");
          // eslint-disable-next-line no-console
          console.error(error.response);
        });
    },

    initialValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focus: "",
    },
  });

  const handleChangeSelection = (key) => (e) => {
    const focus = {
      target: {
        value: key,
      },
    };

    handleChange("focus")(focus);
  };

  return (
    <PaymentContainer>
      <SubTitle variant="h6"> Ingresso </SubTitle>
      <Ticket type={ticketType} value={userOrder.total} />
      <SubTitle variant="h6"> Pagamento </SubTitle>
      {!userData.ticket ? (
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
                style={{ width: "100%" }}
                maxLength="20"
                mask="9999 9999 9999 9999"
                error={errors.number}
                value={data.number || ""}
                onChange={handleChange("number")}
                onSelect={handleChangeSelection("number")}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                label="Name"
                name="name"
                type="text"
                style={{ width: "100%" }}
                error={errors.name}
                value={data.name || ""}
                onChange={handleChange("name")}
                onSelect={handleChangeSelection("name")}
              />
            </InputWrapper>

            <MultiInputWrapper>
              <InputWrapper>
                <Input
                  label="Valid Thru"
                  name="expiry"
                  type="text"
                  style={{ width: "100%" }}
                  mask="19/99"
                  formatChars={{
                    1: "[0-1]",
                    9: "[0-9]",
                  }}
                  error={errors.expiry}
                  value={data.expiry || ""}
                  onChange={handleChange("expiry")}
                  onSelect={handleChangeSelection("expiry")}
                />
              </InputWrapper>

              <InputWrapper width="50%">
                <Input
                  label="CVC"
                  mask="999"
                  name="cvc"
                  type="text"
                  style={{ width: "90%", marginLeft: "10%" }}
                  error={errors.cvc}
                  value={data.cvc || ""}
                  onChange={handleChange("cvc")}
                  onSelect={handleChangeSelection("cvc")}
                />
              </InputWrapper>
            </MultiInputWrapper>
          </ContainerFields>

          <SubmitContainer>
            <Button type="submit" disabled={dynamicInputIsLoading}>
              {dynamicInputIsLoading ? "Processando..." : "Finalizar Pagamento"}
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
  color: #8e8e8e;
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

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
