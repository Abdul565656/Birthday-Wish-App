import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string; // Add className to the props
}

export function Card({ children, className }: CardProps) {
  return <div className={className}>{children}</div>;
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={className}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <div className={className}>{children}</div>;
}

export function CardDescription({ children, className }: CardProps) {
  return <div className={className}>{children}</div>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className }: CardProps) {
  return <div className={className}>{children}</div>;
}