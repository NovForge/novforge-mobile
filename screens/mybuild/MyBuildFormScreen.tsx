import { useState } from 'react';
import { Alert, SafeAreaView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createMyBuild } from '../../services/mybuild';
import { RootStackParamList } from '../../router/routes';
import { styles } from './MyBuildFormScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'MyBuildCreate'> & { accessToken: string };
export default function MyBuildFormScreen({ navigation, accessToken }: Props) {
  const [name, setName] = useState(''); const [isPublic, setPublic] = useState(false); const [saving, setSaving] = useState(false);
  const submit = async () => {
    if (!name.trim()) return Alert.alert('견적 이름을 입력해 주세요.');
    setSaving(true);
    try { const build = await createMyBuild({ buildName: name.trim(), publicBuild: isPublic }, accessToken); navigation.replace('MyBuildDetail', { buildId: build.buildId }); }
    catch (cause) { Alert.alert('생성 실패', cause instanceof Error ? cause.message : '견적을 생성하지 못했습니다.'); }
    finally { setSaving(false); }
  };
  return <SafeAreaView style={styles.screen}><View style={styles.content}>
    <Text style={styles.label}>견적 이름</Text><TextInput value={name} onChangeText={setName} placeholder="예: 200만원 게이밍 PC" placeholderTextColor="#475569" maxLength={100} style={styles.input} autoFocus />
    <View style={styles.switchRow}><View><Text style={styles.switchTitle}>견적 공개</Text><Text style={styles.help}>다른 사용자가 이 견적을 볼 수 있습니다.</Text></View><Switch value={isPublic} onValueChange={setPublic} trackColor={{ false: '#404040', true: '#ffffff' }} thumbColor={isPublic ? '#000000' : '#d4d4d4'} /></View>
    <TouchableOpacity style={[styles.button, saving && styles.disabled]} onPress={() => void submit()} disabled={saving}><Text style={styles.buttonText}>{saving ? '만드는 중...' : '견적 만들기'}</Text></TouchableOpacity>
  </View></SafeAreaView>;
}
