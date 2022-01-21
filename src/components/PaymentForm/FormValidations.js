const validations = {
  cardNumber: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) === 14,
      message: "Digite um número de cartão de crédito válido",
    },
  },

  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite um nome válido",
    },
  },

  validThru: {
    custom: {
      isValid: (value) => !value || !isNaN(new Date(value?.split("-").reverse().join("-"))),
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
