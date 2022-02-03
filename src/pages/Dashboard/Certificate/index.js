import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import UnauthorizedMessage from "../../../components/shared/UnauthorizedMessage";
import CertificateImage from "../../../components/CertificateImage";
import styled from "styled-components";
import Button from "../../../components/Form/Button";
import Title from "../../../components/shared/Title";
import EventInfoContext from "../../../contexts/EventInfoContext";
import useApi from "../../../hooks/useApi";

export default function Certificate() {
  const { userData } = useContext(UserContext);
  const { eventInfo } = useContext(EventInfoContext);
  const { enrollment, activity } = useApi();
  const [userName, setUserName] = useState("");
  const [activitiesData, setActivitiesData] = useState({});

  useEffect(() => {
    enrollment.getPersonalInformations()
      .then((response) => {
        setUserName(response.data.name);
      });

    activity.getActivitiesData()
      .then((response) => {
        setActivitiesData(response.data);
      });
  }, []);

  const type = userData.ticket === "online"? "online" : "presencial";

  return (
    <>
      <Title> Certificação </Title>
      <CertificateImage
        name={userName}
        event={eventInfo.eventTitle}
        year={activitiesData.year}
        startDay={activitiesData.startDay}
        startMonth={activitiesData.startMonth}
        endDay={activitiesData.endDay}
        endMonth={activitiesData.endMonth}
        type={type}
        hours={activitiesData.totalHours}
        border={eventInfo.backgroundImage}
        imgSrc={eventInfo.logoImage}
      />

      <SubmitContainer>
        <Button>
          Baixar
        </Button>
      </SubmitContainer>
    </>
  );
}

const SubmitContainer = styled.div`
  margin-top: 20px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
