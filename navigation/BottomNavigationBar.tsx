import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Cpu, ShieldCheck, UserRound, Wrench, type LucideIcon } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';
import { styles } from './BottomNavigationBar.styles';

const ITEMS: Record<string, { label: string; icon: LucideIcon }> = {
  Equipment: { label: '부품', icon: Cpu },
  MyBuild: { label: '견적', icon: Wrench },
  Admin: { label: '관리', icon: ShieldCheck },
  MyPage: { label: '마이', icon: UserRound },
};

export default function BottomNavigationBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return <View style={styles.container}>{state.routes.map((route, index) => {
    const focused = state.index === index;
    const item = ITEMS[route.name] || { label: route.name, icon: Wrench };
    const Icon = item.icon;
    return <TouchableOpacity key={route.key} style={styles.item} onPress={() => {
      const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
      if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
    }} onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })} accessibilityRole="button" accessibilityState={focused ? { selected: true } : {}} accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}>
      <View style={[styles.indicator, focused && styles.indicatorActive]} />
      <View style={[styles.iconArea, focused && styles.iconAreaActive]}><Icon size={20} strokeWidth={focused ? 2.4 : 2} color={focused ? colors.primary : colors.textSubtle} /></View>
      <Text style={[styles.label, focused && styles.labelActive]}>{item.label}</Text>
    </TouchableOpacity>;
  })}</View>;
}
