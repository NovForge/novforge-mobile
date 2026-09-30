import { ScrollView, Text, View } from 'react-native';
import { MyBuild } from '../../services/mybuild';
import { styles } from '../../screens/mybuild/MyBuildDetailScreen.styles';

type Props = { build: MyBuild };
const parts = [
  ['CPU', 'cpu'], ['그래픽카드', 'gpu'], ['메인보드', 'motherboard'], ['메모리', 'memories'],
  ['저장장치', 'storages'], ['파워', 'powerSupply'], ['CPU 쿨러', 'cpuCooler'], ['케이스', 'pcCase'],
] as const;

export default function MyBuildReadOnlyDetail({ build }: Props) {
  return <ScrollView contentContainerStyle={styles.content}>
    <View style={styles.priceCard}>
      <Text style={styles.priceLabel}>총 견적 금액</Text>
      <Text style={styles.price}>{build.totalPrice.toLocaleString('ko-KR')}원</Text>
    </View>
    <Text style={styles.sectionTitle}>기본 정보</Text>
    <View style={styles.panel}>
      <Text style={styles.readOnlyName}>{build.buildName}</Text>
      <View style={styles.publicRow}><Text style={styles.rowTitle}>공개 견적</Text><Text style={styles.publicValue}>공개</Text></View>
    </View>
    <Text style={styles.sectionTitle}>부품 구성</Text>
    {parts.map(([label, key]) => {
      const value = build[key];
      const values = Array.isArray(value) ? value : value ? [value] : [];
      return <View style={styles.partCard} key={key}>
        <Text style={styles.partLabel}>{label}</Text>
        {values.length ? values.map((part) => <View key={part.id} style={styles.partLine}>
          <View style={styles.partInfo}>
            <Text style={styles.partName}>{part.name}</Text>
            <Text style={styles.partPrice}>{part.price.toLocaleString('ko-KR')}원{'quantity' in part ? ` × ${part.quantity}` : ''}</Text>
          </View>
        </View>) : <Text style={styles.emptyPart}>선택된 부품이 없습니다.</Text>}
      </View>;
    })}
  </ScrollView>;
}
