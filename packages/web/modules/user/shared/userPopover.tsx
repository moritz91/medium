import React from "react";
import { Manager, Reference, Popper } from "react-popper";
import { Heading, Text } from "rebass";
import { FindUserComponent } from "../../../components/apollo-components";
import styled from "styled-components";
import { Flyout, FlexRow } from "../../../components/common/Flyout";
import { Avatar } from "../../../components/common/Avatar";

interface Props {
  children: React.ReactNode;
  popoverState: boolean;
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

export const UserPopover: React.FC<Props> = ({
  children,
  popoverState,
  username
}) => {
  return (
    <FindUserComponent variables={{ username }}>
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
                          left: "-165px"
                        }}
                      >
                        <Flyout data-cy="thread-actions-dropdown">
                          <FlexRow>
                            <PopoverInner>
                              <MetaDataOne>
                                <Heading>{username}</Heading>
                                <Text pl={0}>
                                  Activist, freelance writer, birth doula +
                                  photographer, entrepreneur.
                                </Text>
                              </MetaDataOne>
                              <MetaDataTwo>
                                <Avatar
                                  size={65}
                                  src={data!.findUser!.pictureUrl}
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
      }}
    </FindUserComponent>
  );
};
