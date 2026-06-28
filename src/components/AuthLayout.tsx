import { Box, Card, CardContent, Typography } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        direction: "rtl",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #f7efe5 0%, #f4d7b8 45%, #d7ecff 100%)",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 430,
          borderRadius: 6,
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          overflow: "hidden",
          backdropFilter: "blur(12px)",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #6d4c41, #a1887f)",
            color: "white",
            textAlign: "center",
            py: 4,
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <PetsIcon sx={{ fontSize: 42 }} />
          </Box>

          <Typography variant="h4" component="h1" sx={{ textAlign: "center", mb: 3 }}>
            {title}
          </Typography>

          <Typography sx={{ opacity: 0.9, mt: 1 }}>{subtitle}</Typography>
        </Box>

        <CardContent sx={{ p: 4, backgroundColor: "rgba(255,255,255,0.96)" }}>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
}