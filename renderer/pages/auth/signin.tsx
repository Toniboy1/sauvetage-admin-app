// pages/auth/signin.tsx
import { Button, TextField, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

/**
 *  Sign in page
 * @returns Sign in page
 */
export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async data => {
        const result = await signIn('credentials', {
            redirect: false,
            username: data.username,
            password: data.password,
        });
        if (result?.error) {
            alert('Authentication failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    {...register("username", { required: "Username required" })}
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message.toString()} // Convert the value to a string
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password", { required: "Password required" })}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message.toString()}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign In
                </Button>
            </form>
        </Container>
    );
}
