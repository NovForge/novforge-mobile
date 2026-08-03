import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigationBar } from '../navigation';
import { AuthScreen, EquipmentDetailScreen, EquipmentListScreen, MyPageScreen } from '../screens';
import { AuthSession } from '../services/auth';
import { MainTabParamList, RootStackParamList } from './routes';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();
const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: '#080d18', card: '#0d1422', border: '#1e293b', primary: '#8b5cf6', text: '#f8fafc' } };

type Props = {
  session: AuthSession | null;
  isGuest: boolean;
  onAuthenticated: (session: AuthSession) => void;
  onGuest: () => void;
  onExit: () => void;
};

function MainTabs({ session, onExit }: Pick<Props, 'session' | 'onExit'>) {
  return <Tabs.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomNavigationBar {...props} />}>
    <Tabs.Screen name="Equipment">{() => <EquipmentListScreen accessToken={session?.accessToken} />}</Tabs.Screen>
    <Tabs.Screen name="MyPage">{() => <MyPageScreen session={session} onExit={onExit} />}</Tabs.Screen>
  </Tabs.Navigator>;
}

export default function AppRouter({ session, isGuest, onAuthenticated, onGuest, onExit }: Props) {
  const authenticated = Boolean(session) || isGuest;
  return <NavigationContainer theme={theme}>
    <RootStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0d1422' }, headerTintColor: '#f8fafc', contentStyle: { backgroundColor: '#080d18' } }}>
      {!authenticated ? <RootStack.Screen name="Auth" options={{ headerShown: false }}>{() => <AuthScreen onAuthenticated={onAuthenticated} onGuest={onGuest} />}</RootStack.Screen> : <>
        <RootStack.Screen name="MainTabs" options={{ headerShown: false }}>{() => <MainTabs session={session} onExit={onExit} />}</RootStack.Screen>
        <RootStack.Screen name="EquipmentDetail" options={{ title: '부품 상세' }}>{(props) => <EquipmentDetailScreen {...props} accessToken={session?.accessToken} />}</RootStack.Screen>
      </>}
    </RootStack.Navigator>
  </NavigationContainer>;
}
