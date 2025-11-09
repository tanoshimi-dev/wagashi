import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const BurgerSvg: React.FC = () => {
  return (
    <Svg width={25} height={12} fill="none">
      <G
        stroke="#1E2538"
        strokeLinecap="round"
        strokeWidth={2}
        clipPath="url(#a)"
      >
        <Path d="M1 1h18M1 6h23M1 11h18" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h25v12H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
