import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
  center: { flex: 1, minHeight: 220, alignItems: 'center', justifyContent: 'center', padding: 30 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  emptyBody: { color: colors.textMuted, fontSize: 13, marginTop: 7 },
});
