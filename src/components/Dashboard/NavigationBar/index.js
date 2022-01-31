import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

import styled from "styled-components";

import {
  FaFileContract,
  FaMoneyBill,
  FaBed,
  FaCalendarWeek,
  FaCertificate,
} from "react-icons/fa";

import NavigationButton from "./NavigationButton";

export default function NavigationBar() {
  const location = useLocation();
  const match = useRouteMatch();
  const { userData } = useContext(UserContext);

  function isActive(buttonPath) {
    return location.pathname === buttonPath;
  }

  return (
    <Container>
      <ConditionalLink to={`${match.path}/subscription`}>
        <NavigationButton active={isActive(`${match.path}/subscription`)}>
          <EnrollIcon />
          <span>Inscrição</span>
        </NavigationButton>
      </ConditionalLink>

      <ConditionalLink to={`${match.path}/payment`} disabled={!userData.fullRegistration}>
        <NavigationButton active={isActive(`${match.path}/payment`)}>
          <PaymentIcon />
          <span>Pagamento</span>
        </NavigationButton>
      </ConditionalLink>

      <ConditionalLink to={`${match.path}/hotel`} disabled={!userData.ticket || userData.ticket.type !== "hotel"}>
        <NavigationButton active={isActive(`${match.path}/hotel`)}>
          <HotelIcon />
          <span>Hotel</span>
        </NavigationButton>
      </ConditionalLink>

      <ConditionalLink to={`${match.path}/activities`} disabled={!userData.ticket || userData.ticket.type === "online"}>
        <NavigationButton active={isActive(`${match.path}/activities`)}>
          <ActivityIcon />
          <span>Atividades</span>
        </NavigationButton>
      </ConditionalLink>

      <ConditionalLink to={`${match.path}/certificate`} disabled={true}>
        <NavigationButton active={isActive(`${match.path}/certificate`)}>
          <CertificateIcon  disabled={true}/>
          <span>Certificado</span>
        </NavigationButton>
      </ConditionalLink>
    </Container>
  );
}

const ConditionalLink = styled(Link)`
  pointer-events: ${({ disabled }) => disabled? "none" : "auto"} !important;
  & {
    * {
        color: ${({ disabled }) => disabled? "gray" : ""} !important;
    }
  }
`;

const EnrollIcon = styled(FaFileContract)`
`;

const PaymentIcon = styled(FaMoneyBill)`

`;

const HotelIcon = styled(FaBed)`

`;

const ActivityIcon = styled(FaCalendarWeek)`

`;

const CertificateIcon = styled(FaCertificate)`

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  box-shadow: 2px 0 10px 0 rgba(0,0,0,0.1);
  width: 100px;
  flex-shrink: 0;
  justify-content: flex-start;

  > a {
    text-decoration: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 80px;
    flex-direction: row;
  }
`;
