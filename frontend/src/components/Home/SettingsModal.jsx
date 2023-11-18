import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function SettingsModal(props) {
  const [selectedTheme, setSelectedTheme] = useState("light");

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const handleClose = () => {
    props.onClose(selectedTheme);
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Theme Selection</DialogTitle>
      <DialogContent>
        <RadioGroup
          name="theme"
          value={selectedTheme}
          onChange={handleThemeChange}
        >
          <FormControlLabel value="light" control={<Radio />} label="Light Theme" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark Theme" />
          <FormControlLabel value="blue" control={<Radio />} label="Blue Theme" />
          <FormControlLabel value="green" control={<Radio />} label="Green Theme" />
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsModal;
