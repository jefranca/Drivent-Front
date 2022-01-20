import Grid from "@material-ui/core/Grid";
import TicketsOptions from "./TiketsOptions";
import SubTitle from "./SubTitle";

export default function TicketType() {
  const names = ["Presencial", "Online"];

  return (
    <>
      <SubTitle text={"Primeiro, escolha a modalidade do ingresso"} />
      <Grid
        container
        direction="row"
        justify-content="flex-start"
        align="center"
        spacing={2}
      >
        <Grid item>
          <TicketsOptions
            ticketOption={names[0]}
            select={false}
            //setSelection={setSelection}
            setSelectedTo={false}
          />
        </Grid>
        <Grid item>
          <TicketsOptions
            ticketOption={names[1]}
            select={false}
            //setSelection={setSelection}
            setSelectedTo={false}
          />
        </Grid>
      </Grid>
    </>
  );
}
