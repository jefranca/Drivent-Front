import PaymentInfo from "../../../components/PaymentsInfo/index.js";

import PaymentForm from "../../../components/PaymentForm";

export default function Payment() {
  const { userData } = useContext(UserContext);

  return (
    <>
      <StyledTypography variant="h4"> Ingresso e pagamento </StyledTypography>
      {userData.fullRegistration ? (
        <>
          <PaymentForm />
        </>
      ) : (
        <UnauthorizedMessage>
          Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso
        </UnauthorizedMessage>
      )}
    </>
  );

