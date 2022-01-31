import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import Title from "../../../components/shared/Title";
import UserContext from "../../../contexts/UserContext";
import UnauthorizedMessage from "../../../components/shared/UnauthorizedMessage";
import ActivitiesDays from "../../../components/ActivitiesButton";
import ActivitiesTable from "../../../components/ActivitiesTable";
import useApi from "../../../hooks/useApi";

export default function Activities() {
  const { userData } = useContext(UserContext);
  const { activity } = useApi();
  const [columns, setColumns] = useState([]);
  const [dates, setDates] = useState([]);
  const [day, setDay] = useState();
  const [weekDay, setWeekDay] = useState([]);
  const [selected, setSelected] = useState([]);

  function getActivities(date) {
    activity
      .getActivitiesByDate(date)
      .then((response) => {
        setColumns(response.data);
      })
      .catch((error) => {
        toast("Erro ao carregar atividades.");
        // eslint-disable-next-line no-console
        console.error(error.response);
      });
  }
  useEffect(() => {
    if (day !== undefined) {
      let date = day.split("/");
      let correctDate = `${date[2]}-${date[1]}-${date[0]}`;
      setSelected(day);
      getActivities(correctDate);
    }
  }, [day]);

  useEffect(
    () =>
      activity.getDates().then((res) => {
        const date1 = [...res.data];
        let newDates1;
        let newDates2 = [];
        let weekdays = [];
        date1.forEach((date) => {
          newDates1 = date.split("-");
          weekdays.push(dayjs(date).day());
          newDates2.push(`${newDates1[2]}/${newDates1[1]}/${newDates1[0]}`);
        });
        setDates(newDates2);
        setWeekDay(weekdays);
      }),
    []
  );

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
              {day === undefined ? (
                <h2>Primeiro, filtre pelo dia do evento:</h2>
              ) : (
                ""
              )}
              <ActivitiesDays
                selected={selected}
                dates={dates}
                weekDay={weekDay}
                setDay={setDay}
                day={day}
              />
              <ActivitiesTable
                columns={columns}
                getActivities={getActivities}
                day={day}
              />
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
