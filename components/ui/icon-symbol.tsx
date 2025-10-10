// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  // Navigation
  'house.fill': 'home',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'arrow.left': 'arrow-back',
  
  // Diet & Food
  'fork.knife': 'restaurant',
  'leaf.fill': 'eco',
  'drop.fill': 'water-drop',
  'flame.fill': 'local-fire-department',
  
  // Profile & User
  'person.fill': 'person',
  'person.circle.fill': 'account-circle',
  
  // Stats & Charts
  'chart.bar.fill': 'bar-chart',
  'chart.line.uptrend.xyaxis': 'trending-up',
  
  // Actions
  'plus.circle.fill': 'add-circle',
  'camera.fill': 'camera-alt',
  'heart.fill': 'favorite',
  'heart': 'favorite-border',
  
  // Lists & Organization
  'list.bullet': 'list',
  'calendar': 'calendar-today',
  'clock.fill': 'schedule',
  
  // AI & Smart
  'sparkles': 'auto-awesome',
  'brain': 'psychology',
  
  // Other
  'paperplane.fill': 'send',
  'bell.fill': 'notifications',
  'gear': 'settings',
  'info.circle': 'info',
  'chevron.left.forwardslash.chevron.right': 'code',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
