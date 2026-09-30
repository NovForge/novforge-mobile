import { Text, TouchableOpacity, View } from 'react-native';
import { MyBuild } from '../../services/mybuild';
import { styles } from './MyBuildCard.styles';

type Props = { build: MyBuild; onPress?: () => void };

const countSelectedParts = (build: MyBuild) =>
  [build.motherboard, build.gpu, build.cpu, build.powerSupply, build.cpuCooler, build.pcCase].filter(Boolean).length
  + build.memories.reduce((sum, part) => sum + part.quantity, 0)
  + build.storages.reduce((sum, part) => sum + part.quantity, 0);

const formatDate = (value: string | null) => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('ko-KR');
};

export default function MyBuildCard({ build, onPress }: Props) {
  return <TouchableOpacity style={styles.card} activeOpacity={0.82} onPress={onPress} disabled={!onPress}>
    <View style={styles.topRow}>
      <View style={[styles.badge, build.publicBuild ? styles.publicBadge : styles.privateBadge]}>
        <Text style={[styles.badgeText, build.publicBuild ? styles.publicBadgeText : styles.privateBadgeText]}>{build.publicBuild ? '공개' : '비공개'}</Text>
      </View>
      <Text style={styles.date}>{formatDate(build.updatedAt)} 수정</Text>
    </View>
    <Text style={styles.title} numberOfLines={2}>{build.buildName}</Text>
    <View style={styles.summaryRow}>
      <View><Text style={styles.summaryLabel}>선택 부품</Text><Text style={styles.summaryValue}>{countSelectedParts(build)}개</Text></View>
      <View style={styles.priceArea}><Text style={styles.summaryLabel}>총 견적 금액</Text><Text style={styles.price}>{Number(build.totalPrice || 0).toLocaleString('ko-KR')}원</Text></View>
    </View>
    <View style={styles.footer}><Text style={styles.footerText}>견적 상세 보기</Text><Text style={styles.arrow}>›</Text></View>
  </TouchableOpacity>;
}
