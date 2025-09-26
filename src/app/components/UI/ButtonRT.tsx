interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = 'primary',
  type = 'button',
}) => {
  const baseClasses = 'px-4 py-2 rounded-md transition-colors';
  const variantClasses = {
    primary: 'bg-blue',
    secondary: 'bg-pink-600 text-white hover:bg-pink-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
