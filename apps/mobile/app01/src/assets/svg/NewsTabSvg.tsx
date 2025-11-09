import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  color?: string;
};

export const NewsTabSvg: React.FC<Props> = ({color = '#8A8D9F'}) => {
  return (
    <Svg width={24} height={24} viewBox="0 -960 960 960" fill="none">
      <Path
        fill={color}
        d="M240-280h200v-80H240v80Zm400 0h80v-80h-80v80ZM240-440h200v-80H240v80Zm400 0h80v-240h-80v240ZM240-600h200v-80H240v80Zm-80 480q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-80h640v-560H160v560Zm0 0v-560 560Z"
      />
    </Svg>
  );
};

