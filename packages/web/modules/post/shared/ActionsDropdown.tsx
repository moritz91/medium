import React, { useState } from "react";
import { Manager, Reference, Popper } from "react-popper";
import { Icon, Flyout, FlexRow } from "@medium/ui";

interface Props {
  children: React.ReactNode;
}

export const ActionsDropdown: React.FC<Props> = ({ children }) => {
  const [flyoutOpen, setFlyoutOpen] = useState(false);

  return (
    <Manager>
      <Reference>
        {({ ref }) => {
          return (
            <span ref={ref}>
              <Icon
                style={{ cursor: "pointer" }}
                name="showActions"
                fill="#000"
                onClick={() => {
                  setFlyoutOpen(!flyoutOpen);
                }}
                data-cy="thread-actions-dropdown-trigger"
              />
            </span>
          );
        }}
      </Reference>
      {flyoutOpen && (
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
