"use client";
import { Button, TextField, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Database from '../../model/db';

/**
 *  Sign in page
 * @returns Sign in page
 */
export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm<{ username: string, password: string }>();

    const onSubmit = async (data: { username: string, password: string }) => {
        if (await Database.getInstance().checkCredentials(data.username, data.password)) {
            localStorage.setItem('status', 'authenticated');
            window.location.href = '/forms_interventions';
        } else {
            alert('Nom d\'utilisateur ou mot de passe incorrect');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Se connecter
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nom d'utilisateur"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    {...register("username", { required: "Nom d'utilisateur requis" })}
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message.toString()} // Convert the value to a string
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password", { required: "Mot de passe" })}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message.toString()}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Se connecter
                </Button>
            </form>
        </Container>
    );
}
