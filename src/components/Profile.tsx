import { useAuth } from "../auth/useAuth";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import { LangSwitcher } from "./LangSwitcher";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export const Profile = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  if (!user)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8
        }}
      >
        <ThemeSwitcher />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {t("profile.notAuthorized")}
        </Typography>
        <Button href="/authorization" sx={{ mt: 2 }} variant="contained">
          {t("profile.goToLogin")}
        </Button>
      </Box>
    );

  return (
    <>
      <ThemeSwitcher />
      <LangSwitcher />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 6
        }}
      >
        <Card
          sx={(theme) => ({
            width: 400,
            borderRadius: 2,
            bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 6px 18px rgba(2,6,23,0.6)"
                : "0 6px 18px rgba(15,15,15,0.08)",
          })}
        >
          <CardContent>
            <Stack direction="column" alignItems="center" spacing={2}>
              <Avatar
                src={user.photoURL || ""}
                sx={{ width: 80, height: 80, bgcolor: "primary.main" }}
              >
                {user.email?.[0]?.toUpperCase() || "U"}
              </Avatar>

              <Typography variant="h5">{t("profile.title")}</Typography>

              <Typography variant="body2">
                <strong>UID:</strong> {user.uid}
              </Typography>

              {user.email ? (
                <Typography variant="body2">
                  <strong>{t("profile.email")}:</strong> {user.email}
                </Typography>
              ) : (
                <Typography variant="body2">
                  <strong>{t("profile.phone")}:</strong> {user.phoneNumber}
                </Typography>
              )}

              <Typography variant="body2">
                <strong>{t("profile.providers")}:</strong>{" "}
                {user.providerData.map((p) => p.providerId).join(", ")}
              </Typography>

              <Typography variant="body2">
                <strong>{t("profile.created")}:</strong>{" "}
                {new Date(user.metadata.creationTime || "").toLocaleString()}
              </Typography>

              <Typography variant="body2">
                <strong>{t("profile.lastLogin")}:</strong>{" "}
                {new Date(user.metadata.lastSignInTime || "").toLocaleString()}
              </Typography>

              <Button
                onClick={logout}
                variant="outlined"
                color="error"
                sx={{ mt: 2 }}
              >
                {t("profile.logout")}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
