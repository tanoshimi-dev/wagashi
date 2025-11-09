import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const PlusSvg: React.FC = () => {
  return (
    <Svg width={21} height={20} fill="none">
      <Circle cx={10.094} cy={10} r={10} fill="#1DBF73" />
      <Path
        fill="#fff"
        d="M12.985 9.324v1.272H7.138V9.324h5.847Zm-2.238-2.39v6.21H9.382v-6.21h1.365Z"
      />
    </Svg>
  );
};
