import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const CopySvg: React.FC = () => {
  return (
    <Svg width={22} height={22} fill="none">
      <Path
        fill="#7D849A"
        fillRule="evenodd"
        d="M3 1.75A1.25 1.25 0 0 0 1.75 3v9A1.25 1.25 0 0 0 3 13.25h1a.75.75 0 0 1 0 1.5H3A2.75 2.75 0 0 1 .25 12V3A2.75 2.75 0 0 1 3 .25h9A2.75 2.75 0 0 1 14.75 3v1a.75.75 0 0 1-1.5 0V3A1.25 1.25 0 0 0 12 1.75H3Zm7 7c-.69 0-1.25.56-1.25 1.25v9c0 .69.56 1.25 1.25 1.25h9c.69 0 1.25-.56 1.25-1.25v-9c0-.69-.56-1.25-1.25-1.25h-9ZM7.25 10A2.75 2.75 0 0 1 10 7.25h9A2.75 2.75 0 0 1 21.75 10v9A2.75 2.75 0 0 1 19 21.75h-9A2.75 2.75 0 0 1 7.25 19v-9Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
