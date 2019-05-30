import React, { useRef } from "react";
import { Text } from "rebass";
import { useHover } from "../../../components/hooks/use-hover";

interface PopoverImageProps {
  enableHover?: boolean;
  Component?: any;
}

export const PopoverImage = (props: PopoverImageProps) => {
  const { enableHover, Component } = props;

  const ref = useRef(null);

  useHover(enableHover ? ref : null, isHovered => {
    cacheRef.current.isHovered = isHovered;

    if (cacheRef.current.isHovered) {
      console.log("hi.");
    }
  });

  const cacheRef = useRef({ isHovered: false });

  if (Component)
    return (
      <>
        <Component ref={ref} {...props} />
      </>
    );
  return (
    <>
      <Text p={2} ref={ref}>
        Hallo!
      </Text>
    </>
  );
};
