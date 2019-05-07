import React, { useState } from "react";
import { Manager, Reference, Popper } from "react-popper";
import { Icon, Flyout, FlyoutRow, MyButton } from "@medium/ui";

export const ActionsDropdown = () => {
  const [flyoutOpen, setFlyoutOpen] = useState(false);

  return (
    <Manager>
      <Reference>
        {({ ref }) => {
          return (
            <span ref={ref}>
              <Icon
                name="showActions"
                fill="#fff"
                onClick={() => setFlyoutOpen(!flyoutOpen)}
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
              <div
                ref={ref}
                style={{
                  position: "relative",
                  right: "170px",
                  top: "-40px"
                }}
              >
                <Flyout data-cy="thread-actions-dropdown">
                  <FlyoutRow>
                    <MyButton
                      variant="primary"
                      data-cy={"thread-dropdown-notifications"}
                    >
                      <Icon
                        size={24}
                        fill="#fff"
                        name={"activeNotificationBell"}
                      />
                      <div>{"Subscribed"}</div>
                    </MyButton>
                  </FlyoutRow>
                </Flyout>
              </div>
            );
          }}
        </Popper>
      )}
    </Manager>
  );
};
