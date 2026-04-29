import { forwardRef } from 'react';

const variants = {
  primary: 'bg-[#5DBB63] text-white hover:bg-[#4a9a4f]',
  secondary: 'bg-[#165028] text-white hover:bg-[#0f3d1c]',
  outline: 'border-2 border-[#5DBB63] text-[#165028] hover:bg-[#f0fdf2]',
  ghost: 'text-[#165028] hover:bg-[#f0fdf2]',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
