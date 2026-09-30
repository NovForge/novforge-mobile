import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { EQUIPMENT_CATEGORIES, EquipmentCategory } from '../../services/equipment';
import { styles } from './equipment.styles';

type Props = { selected: EquipmentCategory; onSelect: (category: EquipmentCategory) => void };

export default function CategoryTabs({ selected, onSelect }: Props) {
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar} contentContainerStyle={styles.tabContent}>
    {EQUIPMENT_CATEGORIES.map((category) => <TouchableOpacity key={category.key} style={[styles.tab, category.key === selected.key && styles.tabActive]} onPress={() => onSelect(category)}>
      <Text style={[styles.tabText, category.key === selected.key && styles.tabTextActive]}>{category.label}</Text>
    </TouchableOpacity>)}
  </ScrollView>;
}
