import { Paper } from "@mui/material";
// OWN COMPONENTS
import SimpleFormExample from "~/features/simple-form/components/SimpleFormExample";

function App() {
  return (
    <Paper>
      <h1 className="mb-5 w-60 text-start">a boring form</h1>
      <SimpleFormExample />
    </Paper>
  );
}

export default App;
