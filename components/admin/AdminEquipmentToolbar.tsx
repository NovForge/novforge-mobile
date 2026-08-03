import { Text, TextInput, View } from 'react-native';
import { styles } from './admin.styles';

type Props = { query: string; count: number; onQueryChange: (value: string) => void };

export default function AdminEquipmentToolbar({ query, count, onQueryChange }: Props) {
  return <View style={styles.toolbar}>
    <TextInput style={styles.search} value={query} onChangeText={onQueryChange} placeholder="제조사 또는 제품명 검색" placeholderTextColor="#626269" />
    <Text style={styles.count}>{count}개</Text>
  </View>;
}
