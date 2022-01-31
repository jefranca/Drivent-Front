import { useState, useEffect } from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";

import useApi from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";

import Input from "../Form/Input";
import Button from "../Form/Button";
import Select from "../../components/Form/Select";
import { FormWrapper } from "./FormWrapper";
import { CustomDatePicker } from "./CustomDatePicker";
import { InputWrapper } from "./InputWrapper";
import { ufList } from "./ufList";
import FormValidations from "./FormValidations";

import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

dayjs.extend(CustomParseFormat);

export default function PersonalInformationForm() {
  const { setUserData } = useContext(UserContext);
  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);
  const { enrollment, cep } = useApi();
  const {
    handleSubmit,
    handleChange,
    data,
    errors,
    setErrors,
    setData,
    customHandleChange,
  } = useForm({
    validations: FormValidations,

    onSubmit: (data) => {
      const newData = {
        name: data.name,
        cpf: data.cpf,
        birthday: data.birthday,
        address: {
          cep: data.cep,
          street: data.street,
          city: data.city,
          number: data.number,
          state: data.state,
          neighborhood: data.neighborhood,
          addressDetail: data.addressDetail,
        },
        phone: data.phone
          .replace(/[^0-9]+/g, "")
          .replace(/^(\d{2})([0-9]?\d{4})(\d{4})$/, "($1) $2-$3"),
      };

      enrollment
        .save(newData)
        .then(() => {
          toast("Salvo com sucesso!");
          setUserData((userData) => ({ ...userData, fullRegistration: true }));
        })
        .catch((error) => {
          /* eslint-disable-next-line no-console */
          console.error(error);

          if (error.response?.data?.details) {
            for (const detail of error.response.data.details) {
              toast(detail);
            }
            return;
          } 

          if (error.response.status === 409) {
            setErrors((data) => ({ ...data, cpf: "Este CPF já está cadastrado" }));
            return;
          }
          toast("Não foi possível");
          /* eslint-disable-next-line no-console */
          console.error(error);
        });
    },

    initialValues: {
      cpf: "",
      name: "",
      birthday: null,
      phone: "",
      cep: "",
      street: "",
      city: "",
      number: "",
      state: "",
      neighborhood: "",
      addressDetail: "",
    },
  });

  useEffect(() => {
    enrollment.getPersonalInformations().then((response) => {
      if (response.status !== 200) {
        return;
      }

      const { name, cpf, birthday, phone, address } = response.data;

      setData({
        name,
        cpf,
        birthday,
        phone,
        cep: address.cep,
        street: address.street,
        city: address.city,
        state: address.state,
        number: address.number,
        neighborhood: address.neighborhood,
        addressDetail: address.addressDetail,
      });
    });
  }, []);

  function isValidCep(cep) {
    return cep.length === 8;
  }

  function handleCepChanges(event) {
    const { name, value } = event.target;

    const valueWithoutMask = value.replace("-", "");

    if (isValidCep(valueWithoutMask)) {
      const newDataValues = {
        ...data,
        [name]: value,
      };

      setDynamicInputIsLoading(true);
      cep.getAddress(valueWithoutMask).then(({ data }) => {
        setDynamicInputIsLoading(false);
        setData({
          ...newDataValues,
          street: data.logradouro,
          city: data.localidade,
          neighborhood: data.bairro,
          state: data.uf,
        });
      });
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Suas Informações</StyledTypography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormWrapper onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              label="Nome Completo"
              error={errors.name}
              name="name"
              type="text"
              value={data.name || ""}
              onChange={handleChange("name")}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              name="cpf"
              label="CPF"
              type="text"
              maxLength="14"
              mask="999.999.999-99"
              error={errors.cpf}
              value={data.cpf || ""}
              onChange={handleChange("cpf")}
            />
          </InputWrapper>
          <InputWrapper>
            <CustomDatePicker
              name="birthday"
              error={Boolean(errors.birthday)}
              helperText={errors.birthday}
              format="dd-MM-yyyy"
              label="Data de Nascimento"
              inputVariant="outlined"
              clearable
              value={
                data.birthday && dayjs(data.birthday, "DD-MM-YYYY").toString()
              }
              onChange={(date) => {
                customHandleChange(
                  "birthday",
                  (d) => d && dayjs(d).format("DD-MM-YYYY")
                )(date);
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Telefone"
              mask={
                data.phone.length < 15 ? "(99) 9999-999999" : "(99) 99999-9999"
              }
              name="phone"
              error={errors.phone}
              value={data.phone || ""}
              onChange={handleChange("phone")}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="CEP"
              name="cep"
              mask="99999-999"
              error={errors.cep}
              value={data.cep || ""}
              onChange={(e) => {
                handleChange("cep")(e);
                handleCepChanges(e);
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Select
              label="Estado"
              name="state"
              id="state"
              error={errors.state}
              value={data.state || ""}
              onChange={handleChange("state")}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {ufList.map((uf) => (
                <MenuItem value={uf.name} key={uf.id}>
                  <em>{uf.name}</em>
                </MenuItem>
              ))}
            </Select>
          </InputWrapper>

          <InputWrapper>
            <Input
              label="Cidade"
              name="city"
              error={errors.city}
              value={data.city || ""}
              onChange={handleChange("city")}
              disabled={dynamicInputIsLoading}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Rua"
              name="street"
              error={errors.street}
              value={data.street || ""}
              onChange={handleChange("street")}
              disabled={dynamicInputIsLoading}
            />
          </InputWrapper>

          <InputWrapper>
            <Input
              label="Número"
              name="number"
              error={errors.number}
              value={data.number || ""}
              onChange={handleChange("number")}
              disabled={dynamicInputIsLoading}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Bairro"
              name="neighborhood"
              error={errors.neighborhood}
              value={data.neighborhood || ""}
              onChange={handleChange("neighborhood")}
              disabled={dynamicInputIsLoading}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Complemento"
              name="addressDetail"
              value={data.addressDetail || ""}
              onChange={handleChange("addressDetail")}
            />
          </InputWrapper>

          <SubmitContainer>
            <Button type="submit" disabled={dynamicInputIsLoading}>
              {dynamicInputIsLoading ? 
                "Carregando..."
                :
                "Salvar"}
            </Button>
          </SubmitContainer>
        </FormWrapper>
      </MuiPickersUtilsProvider>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
