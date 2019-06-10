import React from "react";
import { Manager, Reference, Popper } from "react-popper";
import { Icon, Flyout, FlexRow, MyButton } from "@medium/ui";

interface Props {
  children: React.ReactNode;
  flyoutState: boolean;
  onClick: () => void;
}

export const ActionsDropdown: React.FC<Props> = ({
  children,
  flyoutState,
  onClick
}) => {
  return (
    <Manager>
      <Reference>
        {({ ref }) => {
          return (
            <span ref={ref}>
              <MyButton variant="action" onClick={onClick}>
                <Icon
                  name="showActions"
                  fill="#000"
                  data-cy="thread-actions-dropdown-trigger"
                />
              </MyButton>
            </span>
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
                <FlexRow>
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
