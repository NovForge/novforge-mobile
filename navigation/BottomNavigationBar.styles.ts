import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: colors.navigation, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 5, paddingBottom: 9, minHeight: 66 },
  item: { flex: 1, minHeight: 52, alignItems: 'center', justifyContent: 'center', gap: 3, position: 'relative' },
  indicator: { position: 'absolute', top: -5, width: 28, height: 2, backgroundColor: 'transparent' },
  indicatorActive: { backgroundColor: colors.primary },
  iconArea: { width: 36, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 7 },
  iconAreaActive: { backgroundColor: colors.primaryMuted },
  label: { color: colors.textSubtle, fontSize: 10, fontWeight: '600' },
  labelActive: { color: colors.text, fontWeight: '700' },
});
