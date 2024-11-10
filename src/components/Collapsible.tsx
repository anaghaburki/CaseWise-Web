import React, { useState, useRef, useEffect } from 'react';

interface CollapsibleProps {
  collapsed: boolean;
  children: React.ReactNode;
}

const Collapsible = ({ collapsed, children }: CollapsibleProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out`}
      style={{
        height: collapsed ? 0 : height,
      }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default Collapsible;
