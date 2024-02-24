import React from "react";
import Tooltip from "./Tooltip";

const TooltipCon = () => {
  return (
    <div className="tooltipCon">
      <Tooltip>
        <Tooltip.Trigger>
          <button>hover me</button>
        </Tooltip.Trigger>
        <Tooltip.Content>This is Tooltip</Tooltip.Content>
      </Tooltip>
    </div>
  );
};

export default TooltipCon;
