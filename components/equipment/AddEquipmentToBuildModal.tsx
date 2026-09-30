import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { EquipmentItem } from '../../services/equipment';
import { addPartToMyBuild, createMyBuildWithPart, fetchMyBuilds, MyBuild } from '../../services/mybuild';
import { colors } from '../../theme/colors';
import { buildModalStyles as styles } from './AddEquipmentToBuildModal.styles';

type Props = {
  visible: boolean;
  item: EquipmentItem;
  categoryKey: string;
  accessToken: string;
  onClose: () => void;
};

export default function AddEquipmentToBuildModal({ visible, item, categoryKey, accessToken, onClose }: Props) {
  const [builds, setBuilds] = useState<MyBuild[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    fetchMyBuilds(accessToken)
      .then(setBuilds)
      .catch((cause) => Alert.alert('견적 조회 실패', cause instanceof Error ? cause.message : '내 견적을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [accessToken, visible]);

  const complete = (buildName: string) => {
    Alert.alert('견적에 반영했습니다', `${buildName}에 ${item.name}을(를) 반영했습니다.`);
    setName('');
    onClose();
  };

  const addTo = async (build: MyBuild) => {
    setSaving(true);
    try { await addPartToMyBuild(build, categoryKey, item.id, accessToken); complete(build.buildName); }
    catch (cause) { Alert.alert('반영 실패', cause instanceof Error ? cause.message : '견적에 부품을 반영하지 못했습니다.'); }
    finally { setSaving(false); }
  };

  const create = async () => {
    const buildName = name.trim();
    if (!buildName) return Alert.alert('새 견적 이름을 입력해 주세요.');
    setSaving(true);
    try { const build = await createMyBuildWithPart(buildName, categoryKey, item.id, accessToken); complete(build.buildName); }
    catch (cause) { Alert.alert('생성 실패', cause instanceof Error ? cause.message : '새 견적을 만들지 못했습니다.'); }
    finally { setSaving(false); }
  };

  return <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <View style={styles.backdrop}><View style={styles.sheet}>
      <View style={styles.header}><View><Text style={styles.title}>내 견적에 반영</Text><Text style={styles.subtitle} numberOfLines={2}>{item.name}</Text></View><TouchableOpacity onPress={onClose} disabled={saving}><Text style={styles.close}>닫기</Text></TouchableOpacity></View>
      <Text style={styles.sectionTitle}>기존 견적 선택</Text>
      {loading ? <ActivityIndicator style={styles.loading} color={colors.primary} /> : <FlatList
        data={builds}
        keyExtractor={(build) => String(build.buildId)}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>아직 만든 견적이 없습니다.</Text>}
        renderItem={({ item: build }) => <TouchableOpacity style={styles.buildRow} onPress={() => void addTo(build)} disabled={saving}>
          <View style={styles.buildInfo}><Text style={styles.buildName}>{build.buildName}</Text><Text style={styles.buildPrice}>{build.totalPrice.toLocaleString('ko-KR')}원</Text></View>
          <Text style={styles.select}>{saving ? '처리 중' : '선택'}</Text>
        </TouchableOpacity>}
      />}
      <Text style={styles.sectionTitle}>새 견적 만들기</Text>
      <View style={styles.createRow}><TextInput style={styles.input} value={name} onChangeText={setName} placeholder="견적 이름" placeholderTextColor={colors.textSubtle} maxLength={100} /><TouchableOpacity style={styles.createButton} onPress={() => void create()} disabled={saving}><Text style={styles.createText}>만들고 추가</Text></TouchableOpacity></View>
    </View></View>
  </Modal>;
}
