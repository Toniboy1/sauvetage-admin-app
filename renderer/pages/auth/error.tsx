// pages/auth/error.tsx
import { Button, Container, Typography } from "@mui/material";
import { path } from "../../site";
import Link from "next/link";
/**
 * Error page
 * @returns Error page
 */
export default function ErrorPage() {
  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: "center" }}>
      <Typography variant="h4" style={{ marginTop: "20px" }}>
        Authentication Error
      </Typography>
      <Typography variant="body1" style={{ margin: "20px 0" }}>
        There was an error logging you in.
      </Typography>
      <Link href={path("")}>
        <Button variant="contained" color="primary">
          Go to Home
        </Button>
      </Link>
    </Container>
  );
}
