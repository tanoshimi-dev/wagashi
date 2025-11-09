import {RootStackParamList} from '@/types/RootStackParamList';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Navigation = NativeStackNavigationProp<RootStackParamList>;
export const useAppNavigation = () => useNavigation<Navigation>();
