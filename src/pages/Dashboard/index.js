import { useContext, useEffect } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import EventInfoContext from "../../contexts/EventInfoContext";

import NavigationBar from "../../components/Dashboard/NavigationBar";

import DashboardLayout from "../../layouts/Dashboard";
import FillSubscription from "./FillSubscription";
import Payment from "./Payment";
import Hotel from "./Hotel";
import Activities from "./Activities";
import Certificate from "./Certificate";
import useApi from "../../hooks/useApi";

import UserContext from "../../contexts/UserContext";
import ReservationReview from "./Hotel/ReservationReview";

export default function Dashboard() {
  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);
  const match = useRouteMatch();
  const { enrollment, reservation } = useApi();

  useEffect(() => {
    enrollment.getPersonalInformations().then((response) => {
      if (response.data) {
        reservation.getReservationInfo().then((res) => {
          setUserData((userData) => ({
            ...userData,
            fullRegistration: true,
            ticket: {
              ...res.data,
            },
          }));
        });
      } else {
        reservation.getReservationInfo().then((res) => {
          setUserData((userData) => ({
            ...userData,
            fullRegistration: false,
            ticket: {
              ...res.data,
            },
          }));
        });
      }
    });
  }, []);

  return (
    <DashboardLayout background={eventInfo.backgroundImage}>
      <NavigationBar />

      <Container>
        <Switch>
          <Route path={`${match.path}/subscription`} exact>
            <FillSubscription />
          </Route>

          <Route path={`${match.path}/payment`} exact>
            <Payment />
          </Route>

          <Route path={`${match.path}/hotel`} exact>
            <Hotel />
          </Route>

          <Route path={`${match.path}/hotel/reserved`} exact>
            <ReservationReview />
          </Route>

          <Route path={`${match.path}/activities`} exact>
            <Activities />
          </Route>

          <Route path={`${match.path}/certificate`} exact>
            <Certificate />
          </Route>

          <Route path={`${match.path}/`}>
            <Redirect to={`${match.url}/subscription`} />
          </Route>
        </Switch>
      </Container>
    </DashboardLayout>
  );
}

const Container = styled.div`
  padding: 30px;
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  @media (max-width: 600px) {
    height: calc(100vh - 80px);
    padding: 20px;
  }
`;
