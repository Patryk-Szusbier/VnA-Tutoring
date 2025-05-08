import React from "react";

type AnimatedSeparatorProps = {
  className?: string;
};

const AnimatedSeparator: React.FC<AnimatedSeparatorProps> = ({
  className = "",
}) => {
  return <div className={`animated-separator ${className}`} />;
};

export default AnimatedSeparator;
