/* eslint-disable no-console */
import { useEffect } from "react";
import styled from "styled-components";
import useApi from "../../hooks/useApi";
import Card from "./Card";
import Column from "./Column";

export default function ActivitiesTable({
  columns,
  setActivityReservationData,
  getActivities,
  day,
}) {
  const { activity } = useApi();

  function getReservation() {
    activity
      .getActivitiesReservation()
      .then((response) => {
        setActivityReservationData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(getReservation, []);

  return (
    <ContainerActivities>
      <Table>
        {columns.map((column, i) => (
          <Column key={i} index={i} title={column.name}>
            {column.activities.map((activity, j) => (
              <Card
                key={j}
                {...activity}
                lastAt={j === 0 ? "09:00" : column.activities[j - 1].endsAt}
                getReservation={getReservation}
                day={day}
                getActivities={getActivities}
              />
            ))}
          </Column>
        ))}
      </Table>
    </ContainerActivities>
  );
}

const ContainerActivities = styled.div``;

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  min-height: 390px;
  margin-bottom: 10px;
`;
