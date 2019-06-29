import React from "react";
import { Manager, Reference, Popper } from "react-popper";
import { Button } from "../../../components/button";
import { Icon } from "../../../components/icon";
import { Flyout, FlexRow } from "../../../components/common/Flyout";

interface Props {
  children: React.ReactNode;
  flyoutState: boolean;
  onClick: () => void;
  ref1: React.Ref<HTMLDivElement>;
  ref2: React.Ref<HTMLDivElement>;
}

export const ActionsDropdown: React.FC<Props> = ({
  children,
  flyoutState,
  onClick,
  ref1,
  ref2
}) => {
  return (
    <Manager>
      <Reference>
        {({ ref }) => {
          return (
            <div ref={ref1}>
              <span ref={ref}>
                <Button variant="action" onClick={onClick}>
                  <Icon
                    name="showActions"
                    fill="#000"
                    data-cy="thread-actions-dropdown-trigger"
                  />
                </Button>
              </span>
            </div>
          );
        }}
      </Reference>
      {flyoutState && (
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
              <Flyout data-cy="thread-actions-dropdown" ref={ref}>
                <FlexRow ref={ref2}>
                  <Icon
                    size={16}
                    fill="#5C6AC4"
                    name={"activeNotificationBell"}
                  />
                  {children}
                </FlexRow>
              </Flyout>
            );
          }}
        </Popper>
      )}
    </Manager>
  );
};
