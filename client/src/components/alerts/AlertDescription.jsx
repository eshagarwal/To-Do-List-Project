// Rendering text content within an Alert
const AlertDescription = ({ children, className = '' }) => (
    <p className={`text-sm ${className}`}>{children}</p>
  );
  
  export default AlertDescription;
  