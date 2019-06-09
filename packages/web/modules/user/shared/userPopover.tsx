import React from "react";
import { Manager, Reference, Popper } from "react-popper";
import { Flyout, FlexRow, styled, Avatar } from "@medium/ui";
import { Heading, Text } from "rebass";

interface Props {
  children: React.ReactNode;
  popoverState: boolean;
  username: string;
  pictureUrl: string;
}

const PopoverInner = styled.div`
  z-index: 900;
  font-size: 14px;
  display: flex;
  width: 275px;
  align-items: center;
`;

const MetaDataOne = styled.div`
  width: 75%;
`;

const MetaDataTwo = styled.div`
  width: 25%;
  text-align: top;
`;

export const UserPopover: React.FC<Props> = ({
  children,
  popoverState,
  pictureUrl,
  username
}) => {
  return (
    <Manager>
      <Reference>
        {({ ref }) => {
          return (
            <span ref={ref} style={{ minWidth: "45px" }}>
              {children}
            </span>
          );
        }}
      </Reference>
      {popoverState && (
        <Popper
          modifiers={{
            flip: {
              boundariesElement: "viewport",
              behavior: ["top", "bottom", "top"]
            },
            hide: { enabled: false }
          }}
        >
          {({ ref }) => {
            return (
              <div
                ref={ref}
                style={{
                  position: "relative",
                  top: "-125px",
                  left: "-175px"
                }}
              >
                <Flyout data-cy="thread-actions-dropdown">
                  <FlexRow>
                    <PopoverInner>
                      <MetaDataOne>
                        <Heading>{username}</Heading>
                        <Text pl={0}>
                          Mom, activist, freelance writer, birth doula +
                          photographer, future midwife, entrepreneur, and raging
                          feminist.
                        </Text>
                      </MetaDataOne>
                      <MetaDataTwo>
                        <Avatar size={65} src={pictureUrl} borderRadius={0} />
                      </MetaDataTwo>
                    </PopoverInner>
                  </FlexRow>
                </Flyout>
              </div>
            );
          }}
        </Popper>
      )}
    </Manager>
  );
};
