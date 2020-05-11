import { Icon, IconProps } from "components/icon";
import { commands } from "modules/post/shared/markdown-editor/commands";
import React from "react";

export const CommandButton: React.FC<{
  onCommand: (name: string) => void;
  name: IconProps["name"];
}> = React.memo(({ onCommand, name }) => {
  const { label, className = "tooltipped-n" } = commands[name];
  const baseClass = "toolbar-item tooltipped";

  return (
    <div
      className={className ? `${className} ${baseClass}` : baseClass}
      aria-label={label}
      onClick={() => onCommand(name)}
    >
      <Icon size={16} name={name} fill="currentColor" />
    </div>
  );
});
