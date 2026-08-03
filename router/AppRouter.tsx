import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigationBar } from '../navigation';
import { AdminEquipmentScreen, AuthScreen, EquipmentDetailScreen, EquipmentListScreen, MyBuildDetailScreen, MyBuildFormScreen, MyBuildListScreen, MyBuildPartPickerScreen, MyPageScreen } from '../screens';
import { AuthSession } from '../services/auth';
import { MainTabParamList, RootStackParamList } from './routes';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();
const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: '#0c0c0e', card: '#111114', border: '#27272a', primary: '#ededed', text: '#ededed' } };

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
    <RootStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#111114' }, headerTintColor: '#ededed', headerShadowVisible: false, contentStyle: { backgroundColor: '#0c0c0e' } }}>
      {!authenticated ? <RootStack.Screen name="Auth" options={{ headerShown: false }}>{() => <AuthScreen onAuthenticated={onAuthenticated} onGuest={onGuest} />}</RootStack.Screen> : <>
        <RootStack.Screen name="MainTabs" options={{ headerShown: false }}>{() => <MainTabs session={session} onSessionChange={onSessionChange} onExit={onExit} />}</RootStack.Screen>
        <RootStack.Screen name="EquipmentDetail" options={{ title: '부품 상세' }}>{(props) => <EquipmentDetailScreen {...props} accessToken={session?.accessToken} />}</RootStack.Screen>
        {session ? <>
          <RootStack.Screen name="MyBuildCreate" options={{ title: '새 견적', headerStyle: { backgroundColor: '#111114' }, headerTintColor: '#ededed' }}>{(props) => <MyBuildFormScreen {...props} accessToken={session.accessToken} />}</RootStack.Screen>
          <RootStack.Screen name="MyBuildDetail" options={{ title: '견적 상세', headerStyle: { backgroundColor: '#111114' }, headerTintColor: '#ededed' }}>{(props) => <MyBuildDetailScreen {...props} accessToken={session.accessToken} />}</RootStack.Screen>
          <RootStack.Screen name="MyBuildPartPicker" options={{ title: '부품 선택', headerStyle: { backgroundColor: '#111114' }, headerTintColor: '#ededed' }}>{(props) => <MyBuildPartPickerScreen {...props} accessToken={session.accessToken} />}</RootStack.Screen>
        </> : null}
      </>}
    </RootStack.Navigator>
  </NavigationContainer>;
}
