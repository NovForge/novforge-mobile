import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './admin.styles';

type Props = { message: string; onDismiss: () => void };

export default function AdminErrorBanner({ message, onDismiss }: Props) {
  return <View style={styles.errorBanner}>
    <Text style={styles.errorText}>{message}</Text>
    <TouchableOpacity onPress={onDismiss}><Text style={styles.dismiss}>닫기</Text></TouchableOpacity>
  </View>;
}
