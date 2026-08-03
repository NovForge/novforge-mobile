import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, Platform, SafeAreaView, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CategoryTabs } from '../../components/equipment';
import { createEquipment, deleteEquipment, EQUIPMENT_CATEGORIES, EQUIPMENT_FIELDS, EquipmentCategory, EquipmentField, EquipmentItem, fetchEquipment, updateEquipment } from '../../services/equipment';
import { styles } from './AdminEquipmentScreen.styles';

type Props = { accessToken: string };
type FormValues = Record<string, string | boolean>;

const initialValues = (category: EquipmentCategory, item?: EquipmentItem): FormValues => Object.fromEntries(
  EQUIPMENT_FIELDS[category.key].map((field) => [field.key, field.kind === 'boolean' ? Boolean(item?.[field.key]) : String(item?.[field.key] ?? '')]),
);

const payloadFrom = (fields: EquipmentField[], values: FormValues) => Object.fromEntries(fields.map((field) => {
  const value = values[field.key];
  if (field.kind === 'number') return [field.key, Number(value)];
  if (field.kind === 'boolean') return [field.key, Boolean(value)];
  return [field.key, String(value ?? '').trim() || null];
}));

export default function AdminEquipmentScreen({ accessToken }: Props) {
  const [category, setCategory] = useState(EQUIPMENT_CATEGORIES[0]);
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<EquipmentItem | null | undefined>(undefined);
  const [values, setValues] = useState<FormValues>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try { setItems(await fetchEquipment(category, accessToken)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : '목록을 불러오지 못했습니다.'); }
    finally { setLoading(false); }
  }, [accessToken, category]);

  useEffect(() => { void load(); }, [load]);
  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return keyword ? items.filter((item) => `${item.manufacturer} ${item.name}`.toLowerCase().includes(keyword)) : items;
  }, [items, query]);

  const openForm = (item?: EquipmentItem) => { setEditing(item ?? null); setValues(initialValues(category, item)); setError(null); };
  const closeForm = () => { if (!saving) setEditing(undefined); };
  const fields = EQUIPMENT_FIELDS[category.key];

  const save = async () => {
    const missing = fields.find((field) => !field.optional && field.kind !== 'boolean' && !String(values[field.key] ?? '').trim());
    if (missing) { setError(`${missing.label} 항목을 입력해 주세요.`); return; }
    setSaving(true); setError(null);
    try {
      const payload = payloadFrom(fields, values);
      if (editing) await updateEquipment(category, editing.id, payload, accessToken);
      else await createEquipment(category, payload, accessToken);
      setEditing(undefined);
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : '저장하지 못했습니다.'); }
    finally { setSaving(false); }
  };

  const remove = (item: EquipmentItem) => {
    const execute = async () => {
      try { await deleteEquipment(category, item.id, accessToken); await load(); }
      catch (cause) { setError(cause instanceof Error ? cause.message : '삭제하지 못했습니다.'); }
    };
    if (Platform.OS === 'web') {
      if (window.confirm(`'${item.name}' 장비를 삭제할까요?`)) void execute();
    } else Alert.alert('장비 삭제', `'${item.name}' 장비를 삭제할까요?`, [{ text: '취소', style: 'cancel' }, { text: '삭제', style: 'destructive', onPress: () => void execute() }]);
  };

  return <SafeAreaView style={styles.screen}>
    <StatusBar style="light" />
    <View style={styles.header}>
      <View><Text style={styles.eyebrow}>NOVFORGE ADMIN</Text><Text style={styles.title}>장비 관리</Text></View>
      <TouchableOpacity style={styles.addButton} onPress={() => openForm()} accessibilityLabel="새 장비 추가"><Text style={styles.addButtonText}>+ 새 장비</Text></TouchableOpacity>
    </View>
    <CategoryTabs selected={category} onSelect={(next) => { setCategory(next); setQuery(''); }} />
    <View style={styles.toolbar}>
      <TextInput style={styles.search} value={query} onChangeText={setQuery} placeholder="제조사 또는 제품명 검색" placeholderTextColor="#626269" />
      <Text style={styles.count}>{filtered.length}개</Text>
    </View>
    {error && editing === undefined ? <View style={styles.errorBanner}><Text style={styles.errorText}>{error}</Text><TouchableOpacity onPress={() => setError(null)}><Text style={styles.dismiss}>닫기</Text></TouchableOpacity></View> : null}
    {loading ? <View style={styles.center}><ActivityIndicator color="#f2f2f2" size="large" /></View> :
      <FlatList data={filtered} keyExtractor={(item) => String(item.id)} contentContainerStyle={styles.list}
        ListEmptyComponent={<View style={styles.center}><Text style={styles.emptyTitle}>등록된 장비가 없습니다.</Text><Text style={styles.emptyBody}>새 장비 버튼으로 첫 항목을 추가하세요.</Text></View>}
        renderItem={({ item }) => <View style={styles.row}>
          <View style={styles.rowInfo}><Text style={styles.manufacturer}>{item.manufacturer}</Text><Text style={styles.name}>{item.name}</Text><Text style={styles.price}>{Number(item.price).toLocaleString('ko-KR')}원</Text></View>
          <View style={styles.actions}><TouchableOpacity style={styles.editButton} onPress={() => openForm(item)}><Text style={styles.editText}>수정</Text></TouchableOpacity><TouchableOpacity style={styles.deleteButton} onPress={() => remove(item)}><Text style={styles.deleteText}>삭제</Text></TouchableOpacity></View>
        </View>} />}

    <Modal visible={editing !== undefined} transparent animationType="fade" onRequestClose={closeForm}>
      <View style={styles.modalBackdrop}><View style={styles.modalPanel}>
        <View style={styles.modalHeader}><View><Text style={styles.modalEyebrow}>{category.label}</Text><Text style={styles.modalTitle}>{editing ? '장비 수정' : '새 장비 등록'}</Text></View><TouchableOpacity style={styles.closeButton} onPress={closeForm} accessibilityLabel="닫기"><Text style={styles.closeText}>×</Text></TouchableOpacity></View>
        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          {fields.map((field) => <View key={field.key} style={styles.field}>
            <Text style={styles.label}>{field.label}{field.optional ? ' · 선택' : ''}</Text>
            {field.kind === 'boolean' ? <View style={styles.switchRow}><Text style={styles.switchValue}>{values[field.key] ? '사용' : '미사용'}</Text><Switch value={Boolean(values[field.key])} onValueChange={(value) => setValues((current) => ({ ...current, [field.key]: value }))} trackColor={{ false: '#3a3a40', true: '#b7d37a' }} thumbColor="#f7f7f7" /></View> :
              <TextInput style={[styles.input, field.kind === 'multiline' && styles.multiline]} value={String(values[field.key] ?? '')} onChangeText={(value) => setValues((current) => ({ ...current, [field.key]: value }))} placeholder={field.placeholder} placeholderTextColor="#55555c" keyboardType={field.kind === 'number' ? 'decimal-pad' : 'default'} multiline={field.kind === 'multiline'} />}
          </View>)}
          {error ? <Text style={styles.formError}>{error}</Text> : null}
        </ScrollView>
        <View style={styles.formActions}><TouchableOpacity style={styles.cancelButton} onPress={closeForm} disabled={saving}><Text style={styles.cancelText}>취소</Text></TouchableOpacity><TouchableOpacity style={[styles.saveButton, saving && styles.disabled]} onPress={() => void save()} disabled={saving}><Text style={styles.saveText}>{saving ? '저장 중...' : '저장'}</Text></TouchableOpacity></View>
      </View></View>
    </Modal>
  </SafeAreaView>;
}
