import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './BottomNavigationBar.styles';

const LABELS: Record<string, { label: string; mark: string }> = {
  Equipment: { label: '부품', mark: 'P' },
  MyBuild: { label: '내 견적', mark: 'N' },
  MyPage: { label: '마이', mark: 'M' },
};

export default function BottomNavigationBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return <View style={styles.container}>{state.routes.map((route, index) => {
    const focused = state.index === index;
    const item = LABELS[route.name] || { label: route.name, mark: route.name.slice(0, 1) };
    return <TouchableOpacity key={route.key} style={styles.item} onPress={() => {
      const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
      if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
    }} onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })} accessibilityRole="button" accessibilityState={focused ? { selected: true } : {}} accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}>
      <View style={[styles.mark, focused && styles.markActive]}><Text style={[styles.markText, focused && styles.markTextActive]}>{item.mark}</Text></View>
      <Text style={[styles.label, focused && styles.labelActive]}>{item.label}</Text>
    </TouchableOpacity>;
  })}</View>;
}
