import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Portal Component
 * 
 * Renders children into a DOM node that exists outside the parent component's DOM hierarchy.
 * Useful for modals, tooltips, and other overlay components.
 * Creates the container element if it doesn't exist and cleans up when empty.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render in the portal
 * @param {string} [props.containerId="portal-root"] - ID of the container element
 * @returns {React.ReactPortal|null} Portal or null if container not ready
 */
const Portal = ({ children, containerId = "portal-root" }) => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    let portalContainer = document.getElementById(containerId);

    if (!portalContainer) {
      portalContainer = document.createElement("div");
      portalContainer.id = containerId;
      document.body.appendChild(portalContainer);
    }

    setContainer(portalContainer);

    return () => {
      if (portalContainer && portalContainer.childNodes.length === 0) {
        document.body.removeChild(portalContainer);
      }
    };
  }, [containerId]);

  if (!container) return null;

  return createPortal(children, container);
};

export default Portal;
