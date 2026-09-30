import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './MyPageCard.styles';

type Props = {
  visible: boolean;
  withdrawing: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: () => void;
};

export default function WithdrawalConfirmModal({ visible, withdrawing, error, onClose, onConfirm }: Props) {
  return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalBackdrop}>
      <View style={styles.modalPanel}>
        <Text style={styles.modalEyebrow}>ACCOUNT</Text>
        <Text style={styles.modalTitle}>정말 탈퇴하시겠어요?</Text>
        <Text style={styles.helperText}>회원 정보와 저장한 모든 견적이 삭제되며 복구할 수 없습니다.</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.modalActions}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={withdrawing}>
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dangerButton, withdrawing && styles.disabled]} onPress={onConfirm} disabled={withdrawing}>
            {withdrawing ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.dangerText}>회원탈퇴</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>;
}
