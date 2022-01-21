import { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import { useForm } from "../../hooks/useForm";

import Input from "../Form/Input";
import Button from "../Form/Button";
import { FormWrapper } from "./FormWrapper";
import { InputWrapper } from "./InputWrapper";
import { ErrorMsg } from "./ErrorMsg";
import FormValidations from "./FormValidations";

export default function PaymentForm() {
  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);

  const {
    handleSubmit,
    handleChange,
    data,
    errors,
    setData,
    customHandleChange,
  } = useForm({
    validations: FormValidations,

    onSubmit: (data) => {
      const newData = {
        cardNumber: data.cardNumber,
        name: data.name,
        validThru: data.validThru,
        cvc: data.cvc,
      };

      toast("Salvo com sucesso!");
      console.log(newData);
    },

    initialValues: {
      cardNumber: "",
      name: "",
      validThru: null,
      cvc: "",
    },
  });

  return (
    <>
      <FormWrapper onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            label="Card Number"
            name="cardNumber"
            type="text"
            style = {{ width: "100%" }}
            mask="9999 9999 9999 9999"
            value={data.cardNumber || ""}
            onChange={handleChange("cardNumber")}
          />
          {errors.cardNumber && <ErrorMsg>{errors.cardNumber}</ErrorMsg>}
        </InputWrapper>
        <InputWrapper>
          <Input
            label="Name"
            name="name"
            type="text"
            style = {{ width: "100%" }}
            value={data.name || ""}
            onChange={handleChange("name")}
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        </InputWrapper>

        <MultiInputWrapper>
          <InputWrapper>
            <Input
              label="Valid Thru"
              name="validThru"
              type="text"
              style = {{ width: "100%" }}
              mask="19/99"
              formatChars= {{
                "1": "[0-1]",
                "9": "[0-9]",
              }}
              value={data.validThru || ""}
              onChange={handleChange("validThru")}
            />
            {errors.validThru && <ErrorMsg>{errors.validThru}</ErrorMsg>}
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
            />
            {errors.cvc && <ErrorMsg>{errors.cvc}</ErrorMsg>}
          </InputWrapper>
        </MultiInputWrapper>
          
        <SubmitContainer>
          <Button type="submit" disabled={dynamicInputIsLoading}>
              Salvar
          </Button>
        </SubmitContainer>
      </FormWrapper>
    </>
  );
}

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
