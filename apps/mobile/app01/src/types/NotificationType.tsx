import {SvgProps} from 'react-native-svg';

export type NotificationType = {
  id: number;
  icon: React.FC<SvgProps>;
  iconColor: string;
  iconBg: string;
  title: string;
  message: string;
  bold: string[];
};
