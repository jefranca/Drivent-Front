import { useState, useContext } from "react";

import AuthLayout from "../../layouts/Auth";

import Input from "../Form/Input";
import Button from "../Form/Button";
import ErrorMsg from "../shared/ErrorMsg";
import Link from "../Link";
import { Row, Title, Label } from "../Auth";

import EventInfoContext from "../../contexts/EventInfoContext";
import UserContext from "../../contexts/UserContext";

import useApi from "../../hooks/useApi";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });

  const api = useApi();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  function submit(event) {
    event.preventDefault();
    setErrors({});

    if (email.indexOf("@") === -1 || email.length < 5) {
      setErrors({ email: "Preencha um email válido" });
      return;
    }

    if (password.length < 6) {
      setErrors({ password: "A senha deve conter ao menos 6 caracteres" });
      return;
    }

    setLoadingSignIn(true);

    api.auth
      .signIn(email, password)
      .then((response) => {
        setLoadingSignIn(false);
        setUserData(response.data);
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.error(error.response);
        setLoadingSignIn(false);

        const { status } = error.response;

        if (status === 401) {
          setErrors({ general: "E-mail ou senha preenchidos incorretamente" });
          return;
        }
  
        setErrors({ general: "Erro ao conectar. Tente novamente mais tarde." });
        return;
      })
      .then(() => {
        setLoadingSignIn(false);
      });
  }

  return (
    <AuthLayout background={eventInfo.backgroundImage}>
      <Row>
        <img src={eventInfo.logoImage} alt="Event Logo" />
        <Title>{eventInfo.eventTitle}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        {errors.general && (
          <ErrorMsg>
            {errors.general}
          </ErrorMsg>
        )}
        <form onSubmit={submit}>
          <Input
            label="E-mail"
            error={errors.email}
            type="text"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            error={errors.password}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            disabled={loadingSignIn}
          >
            {loadingSignIn ? "Carregando..." : "Entrar"}
          </Button>
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
};

export default SignInForm;
