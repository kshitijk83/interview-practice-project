import React, { useRef } from "react";
import "./Tooltip.css";

const ToolTipContext = React.createContext();

const useTooltip = () => {
  const context = React.useContext(ToolTipContext);
  if (!context) {
    throw new Error("useTooltip must be used within Tooltip");
  }
  return context;
};

const Tooltip = ({ children }) => {
  const [show, setShow] = React.useState(false);
  const triggerRef = useRef(null);
  return (
    <ToolTipContext.Provider value={{ show, setShow, triggerRef }}>
      {children}
    </ToolTipContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { setShow, triggerRef } = useTooltip();

  return (
    <div
      ref={triggerRef}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(true)}
    >
      {children}
    </div>
  );
};

const Content = ({ children, position }) => {
  const { show, triggerRef } = useTooltip();
  return (
    show && (
      <div
        className="tooltip-content"
        style={{ top: triggerRef.current.offsetTop + 40 }}
      >
        {children}
      </div>
    )
  );
};

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;

export default Tooltip;
