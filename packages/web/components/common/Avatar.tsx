import * as React from "react";
import { Image, ImageProps } from "rebass";

export interface AvatarProps
  extends ImageProps,
    React.DOMAttributes<HTMLImageElement> {
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 16,
  borderRadius = "1.65rem",
  ...props
}): JSX.Element => {
  return (
    <Image height={size} width={size} borderRadius={borderRadius} {...props} />
  );
};
