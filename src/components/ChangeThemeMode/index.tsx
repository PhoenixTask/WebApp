import { useContext } from "react";
import { Button, Icon } from "@/components/UI";
import { ThemeContext } from "@/context/ThemeContext";

export default function ChangeModeButton() {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <Button
      onClick={toggleTheme}
      mode="child"
      className="w-10 h-10 flex justify-center items-center p-2 bg-base-content text-base-300 border rounded-full transition-colors duration-300 hover:text-base-content hover:bg-base-100"
    >
      {theme === "light" ? (
        <Icon iconName="DarkMode" />
      ) : (
        <Icon iconName="LightMode" />
      )}
    </Button>
  );
}
