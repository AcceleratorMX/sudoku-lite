import { Button as styles } from "../../css";

const Button = ({
    children,
    variant = "primary",
    size = "medium",
    disabled = false,
    type = "button",
    className = "",
    onClick,
    ...props
}) => {
    const variantClass = styles[variant] || styles.primary;
    const sizeClass = styles[size] || styles.medium;

    const buttonClass = [
        styles.button,
        variantClass,
        sizeClass,
        className
    ].filter(Boolean).join(" ");

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