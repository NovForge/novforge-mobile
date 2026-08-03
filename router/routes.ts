export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  EquipmentDetail: { categoryKey: string; itemId: number };
  MyBuildCreate: undefined;
  MyBuildDetail: { buildId: number };
  MyBuildPartPicker: { buildId: number; categoryKey: string };
};

export type MainTabParamList = {
  Equipment: undefined;
  MyBuild: undefined;
  MyPage: undefined;
};
