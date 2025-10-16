import { Text as DefaultText, TextProps, TextStyle } from "react-native";
import { useMemo } from "react";
import { FontFamilies } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

type ThemedTextProps = TextProps & {
  type?: "default" | "defaultSemiBold" | "title" | "subtitle" | "link";
};

const getFontFamily = (weight?: TextStyle["fontWeight"]): string => {
  switch (weight) {
    case "300":
    case "light":
      return FontFamilies.light;
    case "500":
    case "medium":
      return FontFamilies.medium;
    case "600":
    case "semibold":
      return FontFamilies.semibold;
    case "700":
    case "bold":
      return FontFamilies.bold;
    case "800":
      return FontFamilies.extrabold;
    case "400":
    case "normal":
    default:
      return FontFamilies.regular;
  }
};

const getTypeStyle = (type?: ThemedTextProps["type"]): TextStyle => {
  switch (type) {
    case "default":
      return { fontSize: 16, fontWeight: "400" };
    case "title":
      return { fontSize: 24, fontWeight: "700" };
    case "subtitle":
      return { fontSize: 16, fontWeight: "500" };
    case "link":
      return { fontSize: 16, fontWeight: "600" };
    default:
      return {};
  }
};

export function ThemedText({ 
  type, 
  style, 
  ...otherProps 
}: ThemedTextProps) {
  const color = useThemeColor({}, 'text');
  
  const finalFontFamily = useMemo(() => {
    const typeStyle = getTypeStyle(type);
    const styleArray = Array.isArray(style) ? style : [style];
    const combinedStyles = [typeStyle, ...styleArray];

    let fontWeight: TextStyle["fontWeight"] = "400";
    let fontFamily: string | undefined;

    for (const s of combinedStyles) {
      if (s && typeof s === "object") {
        if ("fontWeight" in s && s.fontWeight) {
          fontWeight = s.fontWeight;
        }
        if ("fontFamily" in s && s.fontFamily) {
          fontFamily = s.fontFamily;
        }
      }
    }

    return fontFamily || getFontFamily(fontWeight);
  }, [type, style]);

  return (
    <DefaultText
      style={[getTypeStyle(type), { fontFamily: finalFontFamily, color }, style]}
      {...otherProps}
    />
  );
}
