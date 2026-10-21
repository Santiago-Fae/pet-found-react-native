import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Map: undefined;
  NewAnimal: undefined;
  Ngos: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<TabParamList> | undefined;
  AnimalDetails: { animalId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
