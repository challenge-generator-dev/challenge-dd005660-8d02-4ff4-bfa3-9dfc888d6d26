import React from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'bordered';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  headerAction?: React.ReactNode;
  onClick?: () => void;
  role?: string;
  ariaLabel?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white shadow-sm',
  elevated: 'bg-white shadow-lg',
  outlined: 'bg-white border-2 border-gray-200',
  bordered: 'bg-white border border-gray-200',
};

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  variant = 'default',
  padding = 'md',
  className = '',
  headerAction,
  onClick,
  role,
  ariaLabel,
}) => {
  const baseClasses = `
    rounded-xl transition-shadow duration-200
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const Component = onClick ? 'button' : 'div';
  const isInteractive = Boolean(onClick);

  const cardContent = (
    <>
      {(title || subtitle || headerAction) && (
        <div className={`flex ${headerAction ? 'justify-between items-start' : 'flex-col'} mb-4`}>
          <div className="flex-1">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {headerAction && <div className="ml-4">{headerAction}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {footer}
        </div>
      )}
    </>
  );

  if (Component === 'button') {
    return (
      <button
        type="button"
        className={`${baseClasses} text-left w-full`}
        onClick={onClick}
        role={role || 'button'}
        aria-label={ariaLabel}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div
      className={baseClasses}
      role={role}
      aria-label={ariaLabel}
    >
      {cardContent}
    </div>
  );
};

Card.displayName = 'Card';

export default Card;