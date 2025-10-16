import { StyleSheet } from "react-native";
import { Layout } from "@/constants/theme";

export const authCommonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maxWidthContainer: {
    flex: 1,
    maxWidth: Layout.maxWidth,
    alignSelf: "center",
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Layout.padding.screen,
  },
  separatorContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: Layout.spacing.sm,
  },
  separator: {
    height: 1,
    width: "100%",
  },
  socialLoginContainer: {
    width: "100%",
    marginTop: Layout.spacing.xl,
  },
  button: {
    width: "100%",
    marginBottom: Layout.spacing.lg,
  },
  input: {
    marginBottom: Layout.spacing.md,
  },
  bottomSpacer: {
    height: Layout.spacing.xxxl,
  },
});

