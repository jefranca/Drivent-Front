import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import AuthLayout from "../../layouts/Auth";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import ErrorMsg from "../shared/ErrorMsg";
import { Row, Title, Label } from "../../components/Auth";
import Link from "../../components/Link";

import EventInfoContext from "../../contexts/EventInfoContext";
import UserContext from "../../contexts/UserContext";

import useApi from "../../hooks/useApi";

const EnrollForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    general: ""
  });
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const api = useApi();

  const { eventInfo } = useContext(EventInfoContext);

  const signIn = (email, password) => {
    api.auth
      .signIn(email, password)
      .then((response) => {
        setUserData(response.data);
      })
      .catch(() => {
        history.push("sign-in");
      });
  };

  function submit(event) {
    event.preventDefault();
    setErrors({});

    if (email.indexOf("@") === -1 || email.length < 5) {
      setErrors({ 
        email: "Preencha um email válido" 
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ 
        password: "A senha e a confirmação devem ser iguais",
        confirmPassword: "A senha e a confirmação devem ser iguais"
      });
      return;
    }

    if (password.length < 6) {
      setErrors({ 
        password: "A senha deve conter pelo menos 6 caracteres",
      });
      return;
    }
    setLoadingEnroll(true);
    api.user
      .signUp(email, password)
      .then((response) => {
        toast("Inscrito com sucesso!");
        signIn(email, password);
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 422) {
          setErrors({ 
            email: "E-mail inválido" 
          });
          return;
        }

        if (status === 409) {
          setErrors({ 
            email: "Este e-mail já foi cadastrado" 
          });
          return;
        }
        setErrors({ general: "Erro ao conectar. Tente novamente mais tarde." });
        return;
      })
      .then(() => {
        setLoadingEnroll(false);
      });
  }

  return (
    <AuthLayout background={eventInfo.backgroundImage}>
      <Row>
        <img src={eventInfo.logoImage} alt="Event Logo" />
        <Title>{eventInfo.eventTitle}</Title>
      </Row>
      <Row>
        <Label>Inscrição</Label>
        {errors.general && (
          <ErrorMsg>
            {errors.general}
          </ErrorMsg>
        )}
        <form onSubmit={submit}>
          <Input
            label="E-mail"
            type="text"
            fullWidth
            error={errors.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            fullWidth
            error={errors.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Repita sua senha"
            type="password"
            fullWidth
            error={errors.confirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            disabled={loadingEnroll}
          >
            {loadingEnroll ? "Carregando..." : "Inscrever"}
          </Button>
        </form>
      </Row>
      <Row>
        <Link to="/sign-in">Já está inscrito? Faça login</Link>
      </Row>
    </AuthLayout>
  );
};

export default EnrollForm;
