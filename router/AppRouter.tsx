import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigationBar } from '../navigation';
import { AdminEquipmentScreen, AuthScreen, EquipmentDetailScreen, EquipmentListScreen, MyBuildDetailScreen, MyBuildFormScreen, MyBuildListScreen, MyBuildPartPickerScreen, MyPageScreen, PublicMyBuildDetailScreen } from '../screens';
import { AuthSession } from '../services/auth';
import { MainTabParamList, RootStackParamList } from './routes';
import { colors } from '../theme/colors';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();
const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.background, card: colors.navigation, border: colors.border, primary: colors.primary, text: colors.text } };

type Props = {
  session: AuthSession | null;
  isGuest: boolean;
  onAuthenticated: (session: AuthSession) => void;
  onGuest: () => void;
  onSessionChange: (session: AuthSession) => void;
  onExit: () => void;
};

function MainTabs({ session, onSessionChange, onExit }: Pick<Props, 'session' | 'onSessionChange' | 'onExit'>) {
  return <Tabs.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomNavigationBar {...props} />}>
    <Tabs.Screen name="Equipment">{() => <EquipmentListScreen accessToken={session?.accessToken} />}</Tabs.Screen>
    <Tabs.Screen name="MyBuild">{() => <MyBuildListScreen accessToken={session?.accessToken} />}</Tabs.Screen>
    {session?.isAdmin ? <Tabs.Screen name="Admin">{() => <AdminEquipmentScreen accessToken={session.accessToken} />}</Tabs.Screen> : null}
    <Tabs.Screen name="MyPage">{() => <MyPageScreen session={session} onSessionChange={onSessionChange} onExit={onExit} />}</Tabs.Screen>
  </Tabs.Navigator>;
}

export default function AppRouter({ session, isGuest, onAuthenticated, onGuest, onSessionChange, onExit }: Props) {
  const authenticated = Boolean(session) || isGuest;
  return <NavigationContainer theme={theme}>
    <RootStack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.navigation }, headerTintColor: colors.text, headerTitleStyle: { fontSize: 16, fontWeight: '700' }, headerShadowVisible: false, contentStyle: { backgroundColor: colors.background } }}>
      {!authenticated ? <RootStack.Screen name="Auth" options={{ headerShown: false }}>{() => <AuthScreen onAuthenticated={onAuthenticated} onGuest={onGuest} />}</RootStack.Screen> : <>
        <RootStack.Screen name="MainTabs" options={{ headerShown: false }}>{() => <MainTabs session={session} onSessionChange={onSessionChange} onExit={onExit} />}</RootStack.Screen>
        <RootStack.Screen name="EquipmentDetail" options={{ title: '부품 상세' }}>{(props) => <EquipmentDetailScreen {...props} accessToken={session?.accessToken} />}</RootStack.Screen>
        {session ? <>
          <RootStack.Screen name="MyBuildCreate" options={{ title: '새 견적' }}>{(props) => <MyBuildFormScreen {...props} accessToken={session.accessToken} />}</RootStack.Screen>
          <RootStack.Screen name="MyBuildDetail" options={{ title: '견적 상세' }}>{(props) => <MyBuildDetailScreen {...props} accessToken={session.accessToken} />}</RootStack.Screen>
          <RootStack.Screen name="PublicMyBuildDetail" component={PublicMyBuildDetailScreen} options={{ title: '공개 견적' }} />
          <RootStack.Screen name="MyBuildPartPicker" options={{ title: '부품 선택' }}>{(props) => <MyBuildPartPickerScreen {...props} accessToken={session.accessToken} />}</RootStack.Screen>
        </> : null}
      </>}
    </RootStack.Navigator>
  </NavigationContainer>;
}
