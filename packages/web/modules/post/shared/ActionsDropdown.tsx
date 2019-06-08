import React, { useState, useRef } from "react";
import { Manager, Reference, Popper } from "react-popper";
import { Icon, Flyout, FlexRow, styled } from "@medium/ui";

const TestFocus = styled.div`
  &:focus {
    border: 1px solid #2188ff;
    box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
      0 0 0 0.2em rgba(3, 102, 214, 0.3);
  }
`;

interface Props {
  children: React.ReactNode;
}

export const ActionsDropdown: React.FC<Props> = ({ children }) => {
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const focusRef = useRef<HTMLInputElement>(null);

  const focusFn = () => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  };

  return (
    <Manager>
      <Reference>
        {({ ref }) => {
          return (
            <TestFocus ref={focusRef}>
              <span ref={ref}>
                <Icon
                  style={{ cursor: "pointer" }}
                  name="showActions"
                  fill="#000"
                  onClick={() => {
                    setFlyoutOpen(!flyoutOpen);
                    focusFn();
                  }}
                  data-cy="thread-actions-dropdown-trigger"
                />
              </span>
            </TestFocus>
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
                  <FlexRow>
                    <Icon
                      size={16}
                      fill="#5C6AC4"
                      name={"activeNotificationBell"}
                    />
                    {children}
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
