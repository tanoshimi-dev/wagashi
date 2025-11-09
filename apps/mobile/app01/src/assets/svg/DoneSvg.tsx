import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const DoneSvg: React.FC = () => {
  return (
    <Svg width={108} height={108} fill="none">
      <Circle cx={54} cy={54} r={54} fill="#1DBF73" />
      <Path
        fill="#fff"
        d="m47.055 62.206-8.987-8.985-2.996 2.994 11.983 11.98L72.73 42.522l-2.995-2.995-22.68 22.68Z"
      />
    </Svg>
  );
};
