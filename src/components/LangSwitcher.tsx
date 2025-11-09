import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useTranslation } from "react-i18next";

export function LangSwitcher() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<string>(() => {
    const saved = localStorage.getItem("lang");
    if (saved) return saved;
    const browserLang = navigator.language.split("-")[0];
    return ["en", "ru", "uk"].includes(browserLang) ? browserLang : "en";
  });

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }, [lang, i18n]);

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newLang: string | null
  ) => {
    if (newLang) setLang(newLang);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <FormControl>
        <ToggleButtonGroup
          color="primary"
          value={lang}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="en">🇬🇧 EN</ToggleButton>
          <ToggleButton value="ru">🇷🇺 RU</ToggleButton>
          <ToggleButton value="uk">🇺🇦 UA</ToggleButton>
        </ToggleButtonGroup>
      </FormControl>
    </Box>
  );
}
