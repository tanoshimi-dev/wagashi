import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  fillColor?: string;
};

export const StarSvg: React.FC<Props> = ({fillColor}) => {
  return (
    <Svg width={13} height={10} viewBox="0 0 14 14">
      <Path
        fill={fillColor || '#FFBC00'}
        stroke="#FFBC00"
        strokeLinejoin="round"
        d="M7 .5c.144 0 .277.073.355.193l1.674 3.3a.5.5 0 0 0 .376.268l3.776.534.012.001a.346.346 0 0 1 .2.593l-2.736 2.59a.501.501 0 0 0-.15.45l.647 3.646a.372.372 0 0 1-.54.384l-.008-.004-3.378-1.727a.502.502 0 0 0-.456 0l-3.377 1.727-.004.002a.38.38 0 0 1-.175.043H3.21a.362.362 0 0 1-.366-.34l.004-.08.646-3.65a.5.5 0 0 0-.149-.45L.61 5.389a.346.346 0 0 1 .2-.592l.012-.002 3.776-.535a.5.5 0 0 0 .376-.269L6.645.693A.424.424 0 0 1 7 .5Z"
      />
    </Svg>
  );
};
