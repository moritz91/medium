import React from "react";
import { Manager, Reference, Popper } from "react-popper";
import { Icon, Flyout, FlexRow, Avatar } from "@medium/ui";
import { useHover } from "use-events";
import { Link } from "../../../server/routes";

interface Props {
  children: React.ReactNode;
  username: any;
  pictureUrl: any;
}

export const AvatarPopover: React.FC<Props> = ({
  children,
  username,
  pictureUrl
}) => {
  const [flyoutOpen, bind] = useHover();

  return (
    <Manager>
      <Reference>
        {({ ref }) => {
          return (
            <span ref={ref} style={{ minWidth: "45px" }}>
              <Link route={"profile"} params={{ username }}>
                <a style={{ cursor: "pointer" }}>
                  <Avatar
                    borderRadius={3}
                    size={34}
                    src={pictureUrl}
                    alt="avatar"
                    {...bind}
                  />
                </a>
              </Link>
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
                  position: "relative"
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
