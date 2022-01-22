const validations = {
  number: {
    custom: {
      isValid: (value) => value?.length === 19,
      message: "Digite um número de cartão de crédito válido",
    },
  },

  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite um nome válido",
    },
  },

  expiry: {
    custom: {
      isValid: (value) => {
        console.log(value);

        return  !value || !isNaN(new Date(value?.split("-").reverse().join("-")));
      },
      message: "Selecione uma data de validade",
    },
  },

  cvc: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) === 3,
      message: "Digite um CVC válido",
    },
  },

};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}
