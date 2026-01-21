import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'gradient';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  size = 'md',
  href,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-5 py-1.5 text-sm',
    md: 'px-6 py-2 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  const baseClasses = `
    relative overflow-hidden
    font-medium tracking-tight
    rounded-full
    transition-all duration-300
    shadow-lg
    active:scale-[0.97]
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/60
  `;

  const variantStyles: Record<string, string> = {
    primary: `
      bg-gradient-to-r from-indigo-600 to-purple-600
      hover:from-indigo-500 hover:to-purple-500
      text-white
      shadow-indigo-500/25 hover:shadow-indigo-500/40
    `,

    gradient: `
      bg-gradient-to-r from-pink-600 to-fuchsia-600
      hover:from-pink-500 hover:to-fuchsia-500
      text-white
      shadow-pink-500/30 hover:shadow-pink-500/50
      hover:scale-[1.02]
    `,

    secondary: `
      bg-white/10 backdrop-blur-sm
      border border-white/20
      text-white
      hover:bg-white/15
      shadow-none hover:shadow-lg hover:shadow-white/10
    `,

    danger: `
      bg-gradient-to-r from-red-600 to-rose-600
      hover:from-red-500 hover:to-rose-500
      text-white
      shadow-red-500/30 hover:shadow-red-500/50
    `,

    ghost: `
      bg-transparent
      text-gray-300 hover:text-white
      shadow-none
      hover:bg-white/10
    `,
  };

  if (href) {
    return (
      <button onClick={onClick}>
        <Link
          href={href}
          className={`${baseClasses} ${sizeClasses[size]} ${variantStyles[variant]} ${className}`}
        >
          {children}
        </Link>
      </button>
    );
  }

  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;