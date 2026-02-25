export default function Card({ className = '', children, hover = false, ...props }) {
  return (
    <div
      className={`rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 ${
        hover ? 'hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08)] hover:border-[#5DBB63]/20' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
