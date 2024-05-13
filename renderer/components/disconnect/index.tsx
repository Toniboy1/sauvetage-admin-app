import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { testAuth } from "../../hooks/auth";

const Disconnect = () => {
  const { status: initialStatus } = testAuth();
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  if (status !== "authenticated") return null;

  const handleDisconnect = () => {
    localStorage.setItem("status", "unauthenticated");
    setStatus("unauthenticated");
    document.location.href = "/forms_interventions";
  };

  return (
    <Button
      onClick={handleDisconnect}
      sx={{
        minWidth: 120,
        maxWidth: 160,
        my: 2,
        mx: 0.5,
        color: "white",
        display: "block",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        WebkitAppRegion: "no-drag",
      }}
    >
      Deconnexion
    </Button>
  );
};

export default Disconnect;
