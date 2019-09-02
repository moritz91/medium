import React, { useContext } from "react";
import { Manager, Popper, Reference } from "react-popper";
import { Heading, Text } from "rebass";
import styled from "styled-components";
import { FindUserByNameComponent } from "../../../components/apollo-components";
import { Avatar } from "../../../components/common/Avatar";
import { FlexRow, Flyout } from "../../../components/common/Flyout";
import {
  FlyoutContextProps,
  FlyoutContext
} from "../../../context/FlyoutContext";

interface UserPopoverProps {
  children: React.ReactNode;
  id: string;
  username: string;
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

export const UserPopover: React.FC<UserPopoverProps> = ({
  children,
  username,
  id
}) => {
  const { state } = useContext<FlyoutContextProps>(FlyoutContext);

  return (
    <FindUserByNameComponent variables={{ username }}>
      {({ data, loading }) => {
        if (loading) {
          return null;
        }

        if (data) {
          return (
            <Manager>
              <Reference>
                {({ ref }) => {
                  return <span ref={ref}>{children}</span>;
                }}
              </Reference>
              {state.popoverId === id && state.popoverState && (
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
                          top: "-200px",
                          left: "0"
                        }}
                      >
                        <Flyout data-cy="thread-actions-dropdown">
                          <FlexRow>
                            <PopoverInner>
                              <MetaDataOne>
                                <Heading>{username}</Heading>
                                <Text pl={0}>
                                  Witty, extensive user description.
                                </Text>
                              </MetaDataOne>
                              <MetaDataTwo>
                                <Avatar
                                  size={65}
                                  src={data!.findUserByName!.pictureUrl}
                                  borderRadius={0}
                                />
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
        }
        return null;
      }}
    </FindUserByNameComponent>
  );
};
