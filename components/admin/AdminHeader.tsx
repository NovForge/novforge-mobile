import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './admin.styles';

type Props = { onAdd: () => void };

export default function AdminHeader({ onAdd }: Props) {
  return <View style={styles.header}>
    <View><Text style={styles.eyebrow}>NOVFORGE ADMIN</Text><Text style={styles.title}>장비 관리</Text></View>
    <TouchableOpacity style={styles.addButton} onPress={onAdd} accessibilityLabel="새 장비 추가">
      <Text style={styles.addButtonText}>+ 새 장비</Text>
    </TouchableOpacity>
  </View>;
}
