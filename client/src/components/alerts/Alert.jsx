// Alert component to display messages
const Alert = ({ children, className = '' }) => (
    <div className={`p-4 border rounded-xl ${className}`}>
      {children}
    </div>
  );
  
  export default Alert;
  