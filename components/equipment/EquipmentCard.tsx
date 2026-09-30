import { Image, Text, TouchableOpacity, View } from 'react-native';
import { EquipmentItem, resolveEquipmentImageUrl } from '../../services/equipment';
import { styles } from './equipment.styles';

type Props = { item: EquipmentItem; categoryLabel: string; onPress: () => void };

export default function EquipmentCard({ item, categoryLabel, onPress }: Props) {
  const imageUrl = resolveEquipmentImageUrl(item.imageUrl);
  return <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      : <View style={styles.imageFallback}><Text style={styles.imageFallbackText}>{categoryLabel.slice(0, 3)}</Text></View>}
    <View style={styles.cardBody}>
      <Text style={styles.manufacturer}>{item.manufacturer}</Text>
      <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.price}>{Number(item.price || 0).toLocaleString('ko-KR')}원</Text>
    </View>
  </TouchableOpacity>;
}
