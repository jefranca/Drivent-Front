import { useContext, useState, useEffect } from "react";
import Title from "../../../components/Dashboard/shared/Title";
import UserContext from "../../../contexts/UserContext";
import styled from "styled-components";
import UnauthorizedMessage from "../../../components/Dashboard/shared/UnauthorizedMessage";
import ActivitiesTable from "../../../components/ActivitiesTable";
import useApi from "../../../hooks/useApi";
import { toast } from "react-toastify";

export default function Activities() {
  const { userData } = useContext(UserContext);
  const { activity } = useApi();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    activity.getActivitiesByDate("2022-02-16")
      .then((response) => {
        setColumns(response.data);
      })
      .catch((error) => {
        toast("Erro ao carregar atividades.");
        // eslint-disable-next-line no-console
        console.error(error.response);
      });
  }, []);

  return (
    <Container>
      <Title>Escolha de atividades</Title>
      {userData.ticket ? (
        <>
          {userData.ticket.type === "online" ? (
            <BoxMessage>
              <UnauthorizedMessage>
                Sua modalidade de ingresso não necessita escolher atividade.
                Você terá acesso a todas as atividades.
              </UnauthorizedMessage>
            </BoxMessage>
          ) : (
            <>
              <h2>Primeiro, filtre pelo dia do evento:</h2>
              <ActivitiesTable columns={columns} />
            </>
          )}
        </>
      ) : (
        <BoxMessage>
          <UnauthorizedMessage>
            Você precisa ter confirmado pagamento antes de fazer a escolha de
            atividades
          </UnauthorizedMessage>
        </BoxMessage>
      )}
    </Container>
  );
}

const Container = styled.div`
  font-family: "Roboto";
  & h2 {
    color: #8e8e8e;
    font-size: 20px;
    margin-bottom: 18px;
  }
`;

const BoxMessage = styled.div`
  display: flex;
  min-height: 500px;
`;
