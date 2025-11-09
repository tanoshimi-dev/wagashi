import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  color?: string;
};

export const WishlistTabSvg: React.FC<Props> = ({color = '#8A8D9F'}) => {
  return (
    <Svg width={24} height={24} fill="none">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20.458 4.591a5.255 5.255 0 0 0-1.708-1.177 5.122 5.122 0 0 0-4.028 0 5.255 5.255 0 0 0-1.708 1.177L12 5.638 10.986 4.59a5.182 5.182 0 0 0-3.722-1.59 5.183 5.183 0 0 0-3.722 1.59A5.52 5.52 0 0 0 2 8.431a5.52 5.52 0 0 0 1.542 3.841l1.014 1.047L12 21l7.444-7.681 1.014-1.047a5.446 5.446 0 0 0 1.141-1.761 5.581 5.581 0 0 0 0-4.158 5.445 5.445 0 0 0-1.141-1.762v0Z"
      />
    </Svg>
  );
};
