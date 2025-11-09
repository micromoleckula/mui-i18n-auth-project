import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useTranslation } from "react-i18next";
import { validateEmailOrPhone, validatePassword } from "../utils/validation";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { ThemeSwitcher } from "../theme/ThemeSwitcher";
import { LangSwitcher } from "./LangSwitcher";

export const AuthForm = () => {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [contactError, setContactError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contactValidation = validateEmailOrPhone(contact);
    const passwordValidation = validatePassword(password);

    setContactError(contactValidation.errorText);
    setPasswordError(passwordValidation.errorText);

    if (!contactValidation.isValid || !passwordValidation.isValid) return;

    try {
      await signIn(contact, password);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setGeneralError(t("validation.invalidCredentials"));
    }
  };

  return (
    <>
      <ThemeSwitcher />
      <LangSwitcher />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={(theme) => ({
            width: 400,
            p: 4,
            borderRadius: 1,
            bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
            color: "text.primary",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 6px 18px rgba(2,6,23,0.6)"
                : "0 6px 18px rgba(15,15,15,0.08)",
          })}
        >
          <h2>{t("login.title")}</h2>

          <TextField
            label={t("login.emailOrPhone")}
            value={contact}
            error={!!contactError}
            helperText={contactError}
            onChange={(e) => {
              setContact(e.target.value);
              if (contactError) setContactError("");
            }}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label={t("login.password")}
            type="password"
            value={password}
            error={!!passwordError}
            helperText={passwordError}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            fullWidth
            sx={{ mb: 2 }}
          />

          {generalError && <p style={{ color: "red" }}>{generalError}</p>}

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button type="submit" variant="contained">
              {t("login.title")}
            </Button>
            <Button href="/registration">{t("login.register")}</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
