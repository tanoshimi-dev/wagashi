import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  color?: string;
};

export const AddToCartSvg: React.FC<Props> = ({color}) => {
  return (
    <Svg width={17} height={17} fill="none">
      <Path
        stroke={color || '#8A8D9F'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.5 5.5v6m-3-3h6m4.5 0a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
      />
    </Svg>
  );
};
