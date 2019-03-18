import React, { useRef } from "react";
import { Box, Text } from "rebass";
import { useHover } from "../../../components/hooks/use-hover";
import styled from "styled-components";

const PopoverContainer = styled(Box)`
  padding: 20px;
  margin: auto;
  outline: none;
  top: 50%;
  box-shadow: 0 1px 15px rgba(27, 31, 35, 0.15);
  background-color: #fff;
  border: 1px solid #d1d5da;
  border-radius: 3px;
`;

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
      <PopoverContainer />;
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
