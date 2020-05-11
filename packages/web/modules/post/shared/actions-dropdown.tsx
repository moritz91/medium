import { Button } from "components/button";
import { FlexRow, Flyout } from "components/common";
import { Icon } from "components/icon";
import { FlyoutContext, FlyoutContextProps } from "context/flyout-context";
import React, { useContext, useRef } from "react";
import { Manager, Popper, Reference } from "react-popper";

interface ActionsDropdownProps {
  children: React.ReactNode;
  id?: string;
}

export const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  children,
  id,
}) => {
  const { dispatch, state } = useContext<FlyoutContextProps>(FlyoutContext);

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  return (
    <Manager>
      <Reference>
        {({ ref }) => {
          return (
            <div ref={ref1}>
              <span ref={ref}>
                <Button
                  variant="action"
                  hoverEffect
                  onClick={() => {
                    if (state.flyoutState) {
                      dispatch({ type: "closeFlyout" });
                    } else {
                      if (ref1.current) {
                        dispatch({ type: "openFlyout", id, ref1, ref2 });
                      }
                    }
                  }}
                >
                  <Icon
                    name="showActions"
                    data-cy="thread-actions-dropdown-trigger"
                  />
                </Button>
              </span>
            </div>
          );
        }}
      </Reference>
      {state.flyoutId === id && state.flyoutState && (
        <Popper
          modifiers={[
            {
              name: "flip",
              enabled: true,
              options: {
                allowedAutoPlacements: ["top", "bottom"],
              },
            },
          ]}
        >
          {({ ref }) => {
            return (
              <Flyout data-cy="thread-actions-dropdown" ref={ref}>
                <FlexRow ref={ref2}>{children}</FlexRow>
              </Flyout>
            );
          }}
        </Popper>
      )}
    </Manager>
  );
};
