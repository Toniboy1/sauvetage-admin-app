// pages/auth/error.tsx
import { Container, Typography, Button } from '@mui/material';
/**
 * Error page
 * @returns Error page
 */
export default function ErrorPage() {
  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center' }}>
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Authentication Error
      </Typography>
      <Typography variant="body1" style={{ margin: '20px 0' }}>
        There was an error logging you in.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go to Home
      </Button>
    </Container>
  );
}
