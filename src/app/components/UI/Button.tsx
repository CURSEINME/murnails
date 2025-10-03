interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary';
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
    primary: `
      bg-white/10 text-pink-400 
      hover:bg-white/20 
      hover:text-pink-300
    `,
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
