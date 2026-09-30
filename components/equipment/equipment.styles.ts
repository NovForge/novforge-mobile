import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  searchBox: { flexDirection: 'row', alignItems: 'center', height: 44, borderRadius: 10, paddingHorizontal: 13, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, gap: 9 },
  searchInput: { flex: 1, height: 42, color: colors.text, fontSize: 15, paddingVertical: 0 },
  tabBar: { height: 48, minHeight: 48, maxHeight: 48, flexGrow: 0, flexShrink: 0, backgroundColor: colors.background, borderBottomWidth: 1, borderColor: colors.border },
  tabContent: { height: 48, paddingHorizontal: 14, alignItems: 'center' },
  tab: { paddingHorizontal: 15, paddingVertical: 13, marginRight: 3 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  tabText: { color: colors.textSubtle, fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: colors.text },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 8, marginBottom: 9, overflow: 'hidden', flexDirection: 'row', minHeight: 108 },
  image: { width: 108, minHeight: 108, backgroundColor: colors.surfaceMuted },
  imageFallback: { width: 108, minHeight: 108, backgroundColor: colors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  imageFallbackText: { color: colors.textMuted, fontSize: 17, fontWeight: '700' },
  cardBody: { flex: 1, padding: 15, justifyContent: 'center' },
  manufacturer: { color: colors.textSubtle, fontSize: 10, fontWeight: '700', marginBottom: 5, textTransform: 'uppercase' },
  itemName: { color: colors.text, fontSize: 15, fontWeight: '600', lineHeight: 20, marginBottom: 9 },
  price: { color: colors.primary, fontSize: 14, fontWeight: '700' },
});
