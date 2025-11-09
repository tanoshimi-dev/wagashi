import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const RightArrowSvg: React.FC = () => {
  return (
    <Svg width={7} height={14} fill="none">
      <Path
        fill="#8A8D9F"
        d="M6.49 6.136 1.045.196a.578.578 0 0 0-.866 0 .71.71 0 0 0 0 .942l5.014 5.47-5.012 5.47a.71.71 0 0 0 0 .942.578.578 0 0 0 .866 0l5.444-5.94a.718.718 0 0 0 0-.944Z"
      />
    </Svg>
  );
};
