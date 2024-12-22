import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

export default function Landings() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <BasicCard />
      <BasicCard />
      <BasicCard />
      <BasicCard />
      <BasicCard />
      <BasicCard />
    </div>
  );
}

const bull = (
  <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);

const BasicCard = () => {
  return (
    <Card
      sx={{ minWidth: 275 }}
      className="!transition-transform duration-500 ease-in-out hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-[0_0_2px_rgba(0,0,0,0.12),_0_4px_8px_rgba(0,0,0,0.14),_rgb(70,79,235)_0px_0px_0px_1px_inset]"
    >
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>adjective</Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
