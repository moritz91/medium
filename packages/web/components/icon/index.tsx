import { icons } from "components/icon/icons";
import React from "react";

export interface IconProps {
  name: keyof typeof icons;
  size?: number;
  fill?: string;
  style?: { [key: string]: string };
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  fill = "currentColor",
  style,
  onClick,
}): JSX.Element => {
  //@ts-ignore
  const { viewBox, d } = icons[name];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      style={style}
      onClick={onClick}
    >
      <path d={d} />
    </svg>
  );
};
