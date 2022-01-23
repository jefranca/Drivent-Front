import Grid from "@material-ui/core/Grid";
import TicketsOptions from "./Ticket";
import SubTitle from "./SubTitle";

export default function TicketList({ type, setType, subTitle, names, prices }) {
  return (
    <>
      <SubTitle text={subTitle} />
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
            type={type === undefined ? null : !type}
            setType={setType}
            setTypeTo={false}
            price={prices[0]}
          />
        </Grid>
        <Grid item>
          <TicketsOptions
            ticketOption={names[1]}
            type={type === undefined ? null : type}
            setType={setType}
            setTypeTo={true}
            price={prices[1]}
          />
        </Grid>
      </Grid>
    </>
  );
}
