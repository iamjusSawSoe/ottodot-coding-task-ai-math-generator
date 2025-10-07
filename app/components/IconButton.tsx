import { Tooltip } from "react-tooltip";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
  className?: string;
}

export function IconButton({
  icon,
  onClick,
  disabled = false,
  tooltip,
  className = "",
}: IconButtonProps) {
  const anchorClass = tooltip
    ? `anchor-${tooltip.toLowerCase().replace(/\s+/g, "-")}`
    : "";

  return (
    <>
      <div
        className={`inline-flex items-center rounded-lg px-2 py-1 text-lg font-medium inset-ring inset-ring-purple-400/30 group/icon ${anchorClass} ${
          disabled
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-purple-400/10 cursor-pointer"
        } ${className}`}
        onClick={!disabled ? onClick : undefined}
      >
        <div
          className={`text-2xl transition-colors ${
            disabled
              ? "text-gray-400"
              : "text-purple-400 group-hover/icon:text-secondary"
          }`}
        >
          {icon}
        </div>
      </div>
      {!disabled && tooltip && (
        <Tooltip anchorSelect={`.${anchorClass}`} place="top">
          {tooltip}
        </Tooltip>
      )}
    </>
  );
}
