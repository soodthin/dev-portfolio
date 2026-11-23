import React from 'react';
import {
  ExternalLink,
  Sun,
  Moon,
  Search,
  Check,
  Copy,
  ArrowUp,
  ArrowRight,
  Printer,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
} from 'lucide-react';
import { siGithub } from 'simple-icons';

interface IconProps {
  className?: string;
  size?: number;
}

export function GithubIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={siGithub.path} />
    </svg>
  );
}

export function ExternalLinkIcon({ className = '', size = 16 }: IconProps) {
  return <ExternalLink size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function SunIcon({ className = '', size = 16 }: IconProps) {
  return <Sun size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function MoonIcon({ className = '', size = 16 }: IconProps) {
  return <Moon size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function SearchIcon({ className = '', size = 16 }: IconProps) {
  return <Search size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function CheckIcon({ className = '', size = 16 }: IconProps) {
  return <Check size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function CopyIcon({ className = '', size = 16 }: IconProps) {
  return <Copy size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function ArrowUpIcon({ className = '', size = 16 }: IconProps) {
  return <ArrowUp size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function ArrowRightIcon({ className = '', size = 16 }: IconProps) {
  return <ArrowRight size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function PrinterIcon({ className = '', size = 16 }: IconProps) {
  return <Printer size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function XIcon({ className = '', size = 18 }: IconProps) {
  return <X size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function ChevronLeftIcon({ className = '', size = 18 }: IconProps) {
  return <ChevronLeft size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function ChevronRightIcon({ className = '', size = 18 }: IconProps) {
  return <ChevronRight size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export function ShareIcon({ className = '', size = 16 }: IconProps) {
  return <Share2 size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}
