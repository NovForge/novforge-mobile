import { TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { styles } from './equipment.styles';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export default function EquipmentSearchBar({ value, onChangeText, placeholder = '장비명 또는 제조사 검색' }: Props) {
  return <View style={styles.searchBox}>
    <Search size={18} color={colors.textSubtle} />
    <TextInput
      style={styles.searchInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textSubtle}
      returnKeyType="search"
      autoCorrect={false}
      clearButtonMode="while-editing"
    />
  </View>;
}
