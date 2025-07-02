interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button' 
}) => {
  const baseClasses = 'px-3 py-1 rounded transition-colors';
  const variantClasses = {
    primary: 'bg-black text-pink-400 hover:bg-gray-700 border-gray-700',
    secondary: 'bg-neutral-800 text-pink-500 hover:bg-gray-300'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;