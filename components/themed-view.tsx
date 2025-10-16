import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  safeAreaTop?: boolean;
  safeAreaBottom?: boolean;
  safeAreaLeft?: boolean;
  safeAreaRight?: boolean;
};

export function ThemedView({ 
  style, 
  safeAreaTop = false,
  safeAreaBottom = false,
  safeAreaLeft = false,
  safeAreaRight = false,
  ...otherProps 
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const insets = useSafeAreaInsets();

  const safeAreaStyle = {
    paddingTop: safeAreaTop ? insets.top : 0,
    paddingBottom: safeAreaBottom ? insets.bottom : 0,
    paddingLeft: safeAreaLeft ? insets.left : 0,
    paddingRight: safeAreaRight ? insets.right : 0,
  };

  return <View style={[{ backgroundColor }, safeAreaStyle, style]} {...otherProps} />;
}
