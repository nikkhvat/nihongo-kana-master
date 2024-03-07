import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

import LanguageButton from "@/entities/profile/language-button/language-button";
import { useThemeContext } from "@/hooks/theme-context";
import { Theme } from "@/shared/constants/profile";
import Button from "@/shared/ui/button/button";
import Switcher from "@/shared/ui/switcher/switcher";


const ProfilePage: React.FC = () => {
  const insets = useSafeAreaInsets();

  const { t, i18n } = useTranslation();

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const { colors, updateTheme, theme, themeString } = useThemeContext();  

  const [themeTab, setThemeTab] = useState<string>(themeString);

  useEffect(() => {    
    setThemeTab(themeString);
  }, [themeString]);

  const onUpdateTheme = (theme: string) => {
    setThemeTab(theme);
    
    if (theme === "light") return updateTheme(Theme.Light);
    if (theme === "dark") return updateTheme(Theme.Dark);

    updateTheme(Theme.Auto);
  };

  const langs = [
    { title: "Русский", key: "ru" },
    { title: "English", key: "en" }
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.color1 }]}>
      <Text style={[styles.title, { color: colors.color4 }]}>{t("tabs.profile")}</Text>

      <Text style={[styles.sectionTitle, { color: colors.color4 }]}>{t("profile.theme")}</Text>

      {/* <View style={styles.sectionButtons}>
        <Button
          customStyles={{ marginTop: 15, flex: 1 }}
          onClick={() => updateTheme(Theme.Light)}
          type={theme === Theme.Light ? "general" : "inactive"}
          icon={
            <Icon 
              name={"sun"} 
              size={24} 
              color={colors._theme === "dark" ? theme === Theme.Light ? colors.color1 : colors.color4 : theme === Theme.Light ? colors.color1 : colors.color4} 
          />}
        />
        <Button
          customStyles={{ marginTop: 15, flex: 1 }}
          onClick={() => updateTheme(Theme.Dark)}
          type={theme === Theme.Dark ? "general" : "inactive"}
          icon={
            <Icon 
              name={"moon"} 
              size={24} 
              color={colors._theme === "light" ? colors.color4 : colors.color1} 
          />}
        />
        <Button
          customStyles={{ flex: 1 }}
          title={t("profile.auto")}
          onClick={() => updateTheme(Theme.Auto)}
          type={theme === Theme.Auto ? "general" : "inactive"}
        />
      </View> */}

      <Switcher
        activeTab={themeTab}
        options={[
          "dark",
          "light",
          "auto",
        ]}
        setActiveTab={onUpdateTheme} />

      <Text style={[styles.sectionTitle, { color: colors.color4 }]}>{t("profile.language")}</Text>

      <View style={styles.sectionButtonsColumn}>
        {langs.map(lang => (
          <LanguageButton 
            key={lang.key}
            langKey={lang.key}
            onPress={() => setLanguage(lang.key)}
            active={i18n.language === lang.key}>
            {lang.title}
          </LanguageButton>
        ))}
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "red",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    marginTop: 30,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 15,
  },
  sectionButtons: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 15,
  },
  sectionButtonsColumn: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
});
