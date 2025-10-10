import { TextInput as DefaultTextInput, TextInputProps, TextStyle, StyleSheet } from "react-native";
import { useMemo } from "react";
import { FontFamilies } from "@/constants/theme";

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

export function TextInput(props: TextInputProps) {
  const { style, ...otherProps } = props;
  
  const finalFontFamily = useMemo(() => {
    const styleArray = Array.isArray(style) ? style : [style];
    
    let fontWeight: TextStyle["fontWeight"] = "400";
    let fontFamily: string | undefined;
    
    for (const s of styleArray) {
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
  }, [style]);

  return (
    <DefaultTextInput 
      style={[
        styles.defaultInput,
        { fontFamily: finalFontFamily },
        style,
      ]} 
      {...otherProps} 
    />
  );
}

const styles = StyleSheet.create({
  defaultInput: {
    backgroundColor: "rgba(82,82,82,0.09)",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 17,
    color: "#222222",
    flex: 1,
  },
});
