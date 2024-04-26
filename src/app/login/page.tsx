import LoginForm from "@/modules/auth/components/login-form";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";

export default function LoginPage() {
  return (
    <Grid2 container sx={{ minHeight: "100vh" }}>
      <Grid2
        xs={12}
        md={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Image src="/next.svg" alt="Logo" width={100} height={100} priority />
      </Grid2>
      <Grid2
        xs={12}
        md={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <LoginForm />
      </Grid2>
    </Grid2>
  );
}
