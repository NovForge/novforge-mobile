import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthUser } from '../../services/auth';
import { styles } from './MyPageCard.styles';

type Props = { visible: boolean; user: AuthUser; nickname: string; error: string | null; saving: boolean; onNicknameChange: (value: string) => void; onClose: () => void; onSave: () => void };

export default function MyPageEditModal({ visible, user, nickname, error, saving, onNicknameChange, onClose, onSave }: Props) {
  return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalBackdrop}><View style={styles.modalPanel}>
      <Text style={styles.modalEyebrow}>MY ACCOUNT</Text><Text style={styles.modalTitle}>내 정보 수정</Text>
      <Text style={styles.fieldLabel}>이름</Text><View style={styles.readonlyInput}><Text style={styles.readonlyText}>{user.userName}</Text></View>
      <Text style={styles.fieldLabel}>이메일</Text><View style={styles.readonlyInput}><Text style={styles.readonlyText}>{user.userEmail}</Text></View>
      <Text style={styles.fieldLabel}>닉네임</Text><TextInput style={styles.input} value={nickname} onChangeText={onNicknameChange} maxLength={50} autoFocus placeholder="닉네임" placeholderTextColor="#606067" />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.modalActions}><TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={saving}><Text style={styles.cancelText}>취소</Text></TouchableOpacity><TouchableOpacity style={[styles.saveButton, saving && styles.disabled]} onPress={onSave} disabled={saving}><Text style={styles.saveText}>{saving ? '저장 중...' : '저장'}</Text></TouchableOpacity></View>
    </View></View>
  </Modal>;
}
