import dayjs from "dayjs";

const validations = {
  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite um nome válido",
    },
  },

  cpf: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) === 14,
      message: "Digite um CPF válido",
    },
  },

  phone: {
    custom: {
      isValid: (value) => {
        const onlyNumbers = value.replace(/[^0-9]+/g, "");
        if (onlyNumbers.length === 11 && onlyNumbers[2] !== "9") {
          return false;
        }

        if (value.length <= 13) {
          return false;
        }

        return true;
      },
      message: "Digite um telefone válido",
    },
  },

  cep: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) === 9,
      message: "Digite um CEP válido",
    },
  },

  city: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite uma cidade",
    },
  },

  neighborhood: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite um bairro",
    },
  },

  street: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite uma rua",
    },
  },

  state: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Selecione um estado",
    },
  },

  birthday: {
    custom: {
      isValid: (value) => {
        if (!value) {
          return false;
        }
        const date = value.split("-")[0];
        const month = Number(value.split("-")[1])-1;
        const year = value.split("-")[2];
       
        const userDate = dayjs().set("year", year).set("month", month).set("date", date);
        const minDate = dayjs().subtract(13, "year");

        if (dayjs(userDate).isAfter(dayjs(minDate))) {
          return false;
        }

        return true;
      },
      message: "O usuário deve ter no mínimo 13 anos",
    },
  },

  number: {
    custom: {
      isValid: (value) => Number(value),
      message: "Digite um número válido",
    },
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}
