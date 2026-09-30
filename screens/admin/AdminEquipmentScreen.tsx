import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, SafeAreaView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AdminEquipmentFormModal, AdminEquipmentRow, AdminEquipmentToolbar, AdminErrorBanner, AdminFormValues, AdminHeader } from '../../components/admin';
import { CategoryTabs } from '../../components/equipment';
import { createEquipment, deleteEquipment, EQUIPMENT_CATEGORIES, EQUIPMENT_FIELDS, EquipmentCategory, EquipmentField, EquipmentItem, fetchEquipment, updateEquipment } from '../../services/equipment';
import { styles } from './AdminEquipmentScreen.styles';

type Props = { accessToken: string };

const initialValues = (category: EquipmentCategory, item?: EquipmentItem): AdminFormValues => Object.fromEntries(
  EQUIPMENT_FIELDS[category.key].map((field) => [field.key, field.kind === 'boolean' ? Boolean(item?.[field.key]) : String(item?.[field.key] ?? '')]),
);

const payloadFrom = (fields: EquipmentField[], values: AdminFormValues) => Object.fromEntries(fields.map((field) => {
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
  const [values, setValues] = useState<AdminFormValues>({});
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

  const fields = EQUIPMENT_FIELDS[category.key];
  const openForm = (item?: EquipmentItem) => { setEditing(item ?? null); setValues(initialValues(category, item)); setError(null); };
  const closeForm = () => { if (!saving) setEditing(undefined); };

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
    <AdminHeader onAdd={() => openForm()} />
    <CategoryTabs selected={category} onSelect={(next) => { setCategory(next); setQuery(''); }} />
    <AdminEquipmentToolbar query={query} count={filtered.length} onQueryChange={setQuery} />
    {error && editing === undefined ? <AdminErrorBanner message={error} onDismiss={() => setError(null)} /> : null}
    {loading ? <View style={styles.center}><ActivityIndicator color="#f2f2f2" size="large" /></View> :
      <FlatList data={filtered} keyExtractor={(item) => String(item.id)} contentContainerStyle={styles.list}
        ListEmptyComponent={<View style={styles.center}><Text style={styles.emptyTitle}>등록된 장비가 없습니다.</Text><Text style={styles.emptyBody}>새 장비 버튼으로 첫 항목을 추가하세요.</Text></View>}
        renderItem={({ item }) => <AdminEquipmentRow item={item} onEdit={() => openForm(item)} onDelete={() => remove(item)} />} />}
    <AdminEquipmentFormModal visible={editing !== undefined} category={category} fields={fields} item={editing ?? null} values={values} error={error} saving={saving}
      onChange={(key, value) => setValues((current) => ({ ...current, [key]: value }))} onClose={closeForm} onSave={() => void save()} />
  </SafeAreaView>;
}
