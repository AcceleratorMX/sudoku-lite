import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    type = 'button',
    className = '',
    onClick,
    ...props
}) => {
    const baseClass = 'button';
    const variantClass = `button--${variant}`;
    const sizeClass = `button--${size}`;
    
    const buttonClass = [
        baseClass,
        variantClass,
        sizeClass,
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClass}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;