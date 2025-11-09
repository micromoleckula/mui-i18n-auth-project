import i18n from "../i18n";

type ValidationResult = {
  isValid: boolean;
  errorText: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[1-9]\d{10,11}$/;
const passwordMinLength = 6;

export function validateEmailOrPhone(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, errorText: i18n.t("validation.required") };
  }

  if (emailRegex.test(value) || phoneRegex.test(value)) {
    return { isValid: true, errorText: "" };
  }

  return { isValid: false, errorText: i18n.t("validation.invalidContact") };
}

export function validatePassword(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, errorText: i18n.t("validation.required") };
  }

  if (value.length < passwordMinLength) {
    return {
      isValid: false,
      errorText: i18n.t("validation.shortPassword", { min: passwordMinLength }),
    };
  }

  return { isValid: true, errorText: "" };
}

export function validatePasswordConfirm(
  pass1: string,
  pass2: string
): ValidationResult {
  if (pass1 !== pass2) {
    return { isValid: false, errorText: i18n.t("validation.passwordMismatch") };
  }
  return { isValid: true, errorText: "" };
}
