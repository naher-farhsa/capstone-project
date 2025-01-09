import React from "react";
import { Alert, Button } from "@material-tailwind/react";

const AlertBox = (props) => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      {/* {!open && (
        <Button className="absolute" onClick={() => setOpen(true)}>
          Show Alert
        </Button>
      )} */}
      <Alert open={open} onClose={() => setOpen(false)} color={props.className}>
        {props.message}
      </Alert>
    </>
  );
};

export default AlertBox;
