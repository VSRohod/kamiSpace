import useTheme from "@/hooks/useTheme";

const { toogleDarkMode } = useTheme();

<TouchableOpacity onPress={toogleDarkMode}>Toogle the mode</TouchableOpacity>