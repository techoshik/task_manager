"use client";
import { spreadField } from "@/utils/formik-utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { LoginDto } from "../dtos/login-dto";
import { LoginSchema } from "@/utils/schemas";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik<LoginDto>({
    validationSchema: LoginSchema,
    validateOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);

      setLoading(true);
      setErrors([]);

      const tempErrors = [];

      setLoading(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={1}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          {...spreadField(formik, "email")}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          {...spreadField(formik, "password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {errors.map((error, index) => (
          <Alert key={`${index}-${error}`} severity="error">
            {error}
          </Alert>
        ))}

        <LoadingButton
          variant="contained"
          type="submit"
          loading={loading}
          fullWidth={true}
        >
          Login
        </LoadingButton>
      </Stack>
    </form>
  );
}
