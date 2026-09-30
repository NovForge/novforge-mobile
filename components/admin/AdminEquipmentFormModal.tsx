import { Modal, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { EquipmentCategory, EquipmentField, EquipmentItem } from '../../services/equipment';
import { styles } from './admin.styles';

export type AdminFormValues = Record<string, string | boolean>;
type Props = {
  visible: boolean;
  category: EquipmentCategory;
  fields: EquipmentField[];
  item: EquipmentItem | null;
  values: AdminFormValues;
  error: string | null;
  saving: boolean;
  onChange: (key: string, value: string | boolean) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function AdminEquipmentFormModal({ visible, category, fields, item, values, error, saving, onChange, onClose, onSave }: Props) {
  return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalBackdrop}><View style={styles.modalPanel}>
      <View style={styles.modalHeader}>
        <View><Text style={styles.modalEyebrow}>{category.label}</Text><Text style={styles.modalTitle}>{item ? '장비 수정' : '새 장비 등록'}</Text></View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose} accessibilityLabel="닫기"><Text style={styles.closeText}>×</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        {fields.map((field) => <View key={field.key} style={styles.field}>
          <Text style={styles.label}>{field.label}{field.optional ? ' · 선택' : ''}</Text>
          {field.kind === 'boolean' ? <View style={styles.switchRow}>
            <Text style={styles.switchValue}>{values[field.key] ? '사용' : '미사용'}</Text>
            <Switch value={Boolean(values[field.key])} onValueChange={(value) => onChange(field.key, value)} trackColor={{ false: '#3a3a40', true: '#b7d37a' }} thumbColor="#f7f7f7" />
          </View> : <TextInput style={[styles.input, field.kind === 'multiline' && styles.multiline]} value={String(values[field.key] ?? '')} onChangeText={(value) => onChange(field.key, value)} placeholder={field.placeholder} placeholderTextColor="#55555c" keyboardType={field.kind === 'number' ? 'decimal-pad' : 'default'} multiline={field.kind === 'multiline'} />}
        </View>)}
        {error ? <Text style={styles.formError}>{error}</Text> : null}
      </ScrollView>
      <View style={styles.formActions}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={saving}><Text style={styles.cancelText}>취소</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.saveButton, saving && styles.disabled]} onPress={onSave} disabled={saving}><Text style={styles.saveText}>{saving ? '저장 중...' : '저장'}</Text></TouchableOpacity>
      </View>
    </View></View>
  </Modal>;
}
