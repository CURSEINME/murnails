interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
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
  const baseClasses =
    'px-5 py-2 rounded-2xl font-semibold transition-all duration-300 shadow-lg border border-white/20 relative overflow-hidden';

  const variantClasses: Record<string, string> = {
    primary: `
      bg-gradient-to-r from-pink-500/40 to-pink-400/30 text-white
      hover:from-pink-500/60 hover:to-pink-400/50
      before:absolute before:inset-0 before:bg-white/10 before:blur-xl before:opacity-0 hover:before:opacity-30
    `,
    secondary: `
      bg-gradient-to-r from-gray-600/20 to-gray-500/20 text-gray-200
      hover:from-gray-600/40 hover:to-gray-500/40
    `,
    danger: `
      bg-gradient-to-r from-red-500/40 to-red-400/30 text-white
      hover:from-red-500/60 hover:to-red-400/50
    `,
    ghost: `
      bg-transparent text-gray-300 hover:bg-white/10
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
