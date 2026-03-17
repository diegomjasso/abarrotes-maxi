import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";

const LoginForm = ({
  onSubmit,
  loading,
  errorMessage,
}) => {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.identifier.trim()) {
      newErrors.identifier =
        "Ingrese CURP, email o username";
    }

    if (!form.password.trim()) {
      newErrors.password =
        "La contraseña es obligatoria";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(form);
  };

  return (
    <Paper sx={{ padding: 4, width: 350 }} elevation={3}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
            Abarrotes Maxi
          </Typography>

          <TextField
            label="CURP, Email o Username"
            value={form.identifier}
            onChange={(e) =>
              setForm({
                ...form,
                identifier: e.target.value,
              })
            }
            error={!!errors.identifier}
            helperText={errors.identifier}
            fullWidth
          />

          <TextField
            label="Contraseña"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
          >
            Iniciar Sesión
          </Button>

          {errorMessage && (
            <Alert severity="error">
              {errorMessage}
            </Alert>
          )}
        </Stack>
      </form>
    </Paper>
  );
};

export default LoginForm;