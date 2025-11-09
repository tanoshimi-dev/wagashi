import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const WalletSvg: React.FC = () => {
  return (
    <Svg width={50} height={50} fill="none">
      <Circle cx={25} cy={25} r={25} fill="#FFBC00" opacity={0.1} />
      <Path
        fill="#FFBC00"
        fillRule="evenodd"
        d="M34 36H17a2.981 2.981 0 0 1-3-2.955V18a4 4 0 0 1 4-4h11.8a4 4 0 0 1 4 4v.38a2.2 2.2 0 0 1 1.515.687c.416.392.662.932.685 1.503v13.46A1.987 1.987 0 0 1 34 36Zm-2-10.95a1.991 1.991 0 1 0 2 1.991 2 2 0 0 0-2-1.991Zm-15.8-7.36a1.5 1.5 0 0 1 1.5-1.5h12.4a1.5 1.5 0 0 1 1.5 1.5v.69H16.2v-.69Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
