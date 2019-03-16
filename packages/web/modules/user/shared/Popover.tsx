import React, { useRef } from "react";
// import styled from "styled-components";
import { Text } from "rebass";
import { useHover } from "../../../components/hooks/use-hover";

// const PopoverContainer = styled(Box)`
//   display: none;
//   outline: none;
//   top: 1318.59px;
//   left: 340.5px;
//   z-index: 100;
//   box-shadow: 0 1px 15px rgba(27, 31, 35, 0.15);
//   background-color: #fff;
//   border: 1px solid #d1d5da;
//   border-radius: 3px;
// `;

interface PopoverImageProps {
  enableHover?: boolean;
}

export const PopoverImage = (props: PopoverImageProps) => {
  const { enableHover } = props;

  const ref = useRef(null);

  useHover(enableHover ? ref : null, isHovered => {
    cacheRef.current.isHovered = isHovered;
    console.log("hovering: " + isHovered);
  });

  const cacheRef = useRef({ isHovered: false });

  return (
    <>
      <Text ref={ref} p={2}>
        Text
      </Text>
    </>
  );
};
