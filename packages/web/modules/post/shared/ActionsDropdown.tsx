import React, { useState } from "react";
import { Manager, Reference, Popper } from "react-popper";
import { Icon, Flyout, FlyoutRow } from "@medium/ui";
import { DeleteComment } from "./DeleteComment";

interface Props {
  commentId: string;
}

export const ActionsDropdown: React.FC<Props> = ({ commentId }) => {
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
                  <FlyoutRow style={{ cursor: "pointer" }}>
                    <Icon
                      size={24}
                      fill="#fff"
                      name={"activeNotificationBell"}
                    />
                    <DeleteComment commentId={commentId} />
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
