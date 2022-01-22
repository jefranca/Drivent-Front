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
        if (!value) {
          return false;
        }

        if (value.length < 5) {
          return false;
        }
        
        const currentTime = new Date();
        const cardMonth = parseInt(value.split("/")[0]);
        const cardYear = parseInt(value.split("/")[1]);
        const currentYear = parseInt(currentTime.getFullYear().toString().substring(2));
        const currentMonth = parseInt(currentTime.getMonth() + 1);

        if (cardMonth > 12) {
          return false;
        }

        if (cardMonth <= 0) {
          return false;
        }

        if (cardYear < currentYear) {
          return false;
        }

        if (cardYear === currentYear && cardMonth <= currentMonth) {
          return false;
        }

        return true;
      },
      message: "Data inválida",
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
