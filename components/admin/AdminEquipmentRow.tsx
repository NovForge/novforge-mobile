import { Text, TouchableOpacity, View } from 'react-native';
import { EquipmentItem } from '../../services/equipment';
import { styles } from './admin.styles';

type Props = { item: EquipmentItem; onEdit: () => void; onDelete: () => void };

export default function AdminEquipmentRow({ item, onEdit, onDelete }: Props) {
  return <View style={styles.row}>
    <View style={styles.rowInfo}>
      <Text style={styles.manufacturer}>{item.manufacturer}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{Number(item.price).toLocaleString('ko-KR')}원</Text>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity style={styles.editButton} onPress={onEdit}><Text style={styles.editText}>수정</Text></TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}><Text style={styles.deleteText}>삭제</Text></TouchableOpacity>
    </View>
  </View>;
}
