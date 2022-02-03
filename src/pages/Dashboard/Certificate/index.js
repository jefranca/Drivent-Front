import React, { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../../../contexts/UserContext";
import UnauthorizedMessage from "../../../components/shared/UnauthorizedMessage";
import CertificateImage from "../../../components/CertificateImage";
import styled from "styled-components";
import Button from "../../../components/Form/Button";
import Title from "../../../components/shared/Title";
import EventInfoContext from "../../../contexts/EventInfoContext";
import useApi from "../../../hooks/useApi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Certificate() {
  const { userData } = useContext(UserContext);
  const { eventInfo } = useContext(EventInfoContext);
  const { enrollment, activity } = useApi();
  const [userName, setUserName] = useState("");
  const [activitiesData, setActivitiesData] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef();

  const handleDownloadPdf = () => {
    setIsDownloading(true);
  };

  const download = async() => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const pdf = new jsPDF();
    pdf.addImage(data, "JPEG", 0, 0);
    pdf.save("certificado.pdf");
  };

  useEffect(() => {
    if (isDownloading) {
      download();
      setIsDownloading(false);
    }
  }, [isDownloading]);

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
      <CertificateContainer ref={certificateRef} isDownloading={isDownloading}>
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
      </CertificateContainer>
    
      <SubmitContainer>
        <Button onClick={handleDownloadPdf}>
          Baixar
        </Button>
      </SubmitContainer>
    </>
  );
}

const CertificateContainer = styled.div`
  ${({ isDownloading }) => isDownloading && `
    position: absolute;
    width: 721px;
  `}
`;

const SubmitContainer = styled.div`
  margin-top: 20px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
