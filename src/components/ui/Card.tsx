import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-xl p-6",
        hover && "transition-all duration-150 hover:border-indigo-300 hover:shadow-sm cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
