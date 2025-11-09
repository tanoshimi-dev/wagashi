import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const MinusSvg: React.FC = () => {
  return (
    <Svg width={21} height={20} fill="none">
      <Circle cx={10.094} cy={10} r={10} fill="#1DBF73" opacity={0.15} />
      <Path fill="#1DBF73" d="M11.693 9.793v1.125h-3.1V9.793h3.1Z" />
    </Svg>
  );
};
