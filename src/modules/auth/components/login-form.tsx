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
import { loggedInUserAtom, loginAtom } from "../auth-atoms";
import { useAtom, useAtomValue } from "jotai";

export default function LoginForm() {
  const [{ mutate, status, error }] = useAtom(loginAtom);
  const user = useAtomValue(loggedInUserAtom);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<LoginDto>({
    validationSchema: LoginSchema,
    validateOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: LoginDto) => mutate(values),
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
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {error?.errorList?.map((error, index) => (
          <Alert key={`${index}-${error}`} severity="error">
            {error}
          </Alert>
        ))}

        <LoadingButton
          variant="contained"
          type="submit"
          loading={status === "pending"}
          fullWidth={true}
        >
          Login
        </LoadingButton>
      </Stack>
    </form>
  );
}
