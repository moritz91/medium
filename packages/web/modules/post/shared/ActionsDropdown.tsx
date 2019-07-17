import React, { useContext } from "react";
import { Manager, Popper, Reference } from "react-popper";
import { Button } from "../../../components/button";
import { FlexRow, Flyout } from "../../../components/common/Flyout";
import {
  FlyoutContext,
  FlyoutContextProps
} from "../../../components/context/FlyoutContext";
import { Icon } from "../../../components/icon";
import { useRef } from "react";

interface ActionsDropdownProps {
  children: React.ReactNode;
  id?: string;
}

export const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  children,
  id
}) => {
  const { dispatch, state } = useContext<FlyoutContextProps>(FlyoutContext);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

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
                      dispatch({
                        type: "closeFlyout"
                      });
                    } else {
                      dispatch({
                        type: "openFlyout",
                        id,
                        ref1,
                        ref2
                      });
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
                <FlexRow ref={ref2}>{children}</FlexRow>
              </Flyout>
            );
          }}
        </Popper>
      )}
    </Manager>
  );
};
