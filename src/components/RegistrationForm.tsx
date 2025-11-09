import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useTranslation } from "react-i18next";
import {
  validateEmailOrPhone,
  validatePassword,
  validatePasswordConfirm,
} from "../utils/validation";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { ThemeSwitcher } from "../theme/ThemeSwitcher";
import { LangSwitcher } from "./LangSwitcher";

export const RegistrationForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp, sendOTP, verifyOTP } = useAuth();

  const [mode, setMode] = useState<"email" | "phone">("email");
  const [step, setStep] = useState<"register" | "verify">("register");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState({ first: "", second: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "email") {
      const emailValid = validateEmailOrPhone(email);
      const passValid = validatePassword(password.first);
      const confirmValid = validatePasswordConfirm(
        password.first,
        password.second
      );

      if (!emailValid.isValid) return setError(emailValid.errorText);
      if (!passValid.isValid) return setError(passValid.errorText);
      if (!confirmValid.isValid) return setError(confirmValid.errorText);

      try {
        await signUp(email, password.first);
        navigate("/profile");
      } catch (err) {
        console.error(err);
        setError(t("validation.signupFailed"));
      }
    } else {
      try {
        await sendOTP(phone);
        setStep("verify");
      } catch (err) {
        console.error(err);
        setError(t("validation.smsSendError"));
      }
    }
  };

  const handleVerify = async () => {
    try {
      await verifyOTP(otp);
      navigate("/profile");
    } catch {
      setError(t("validation.wrongCode"));
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
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 6px 18px rgba(2,6,23,0.6)"
                : "0 6px 18px rgba(15,15,15,0.08)",
          })}
        >
          <h2>{t("register.title")}</h2>

          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, newMode) => newMode && setMode(newMode)}
            sx={{ mb: 3 }}
          >
            <ToggleButton value="email">{t("register.email")}</ToggleButton>
            <ToggleButton value="phone">{t("register.phone")}</ToggleButton>
          </ToggleButtonGroup>

          {mode === "email" && (
            <>
              <TextField
                label={t("register.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />

              <TextField
                label={t("register.password")}
                type="password"
                value={password.first}
                onChange={(e) =>
                  setPassword({ ...password, first: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              <TextField
                label={t("register.confirm")}
                type="password"
                value={password.second}
                onChange={(e) =>
                  setPassword({ ...password, second: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
            </>
          )}

          {mode === "phone" && (
            <>
              {step === "register" ? (
                <>
                  <TextField
                    label={t("register.phone")}
                    placeholder="+380XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <div id="recaptcha-container"></div>
                </>
              ) : (
                <TextField
                  label={t("register.code")}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
            </>
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Stack direction="row" spacing={2} justifyContent="center">
            {mode === "phone" && step === "verify" ? (
              <Button variant="contained" onClick={handleVerify}>
                {t("register.verify")}
              </Button>
            ) : (
              <Button type="submit" variant="contained">
                {mode === "email"
                  ? t("register.submit")
                  : t("register.sendCode")}
              </Button>
            )}
            <Button href="/authorization">{t("register.back")}</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
