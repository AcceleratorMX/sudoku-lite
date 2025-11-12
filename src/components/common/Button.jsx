import { classNames } from "../../utils";
import { Button as styles } from "../../css";

/**
 * Button Component
 * 
 * Reusable button with multiple variants and sizes.
 * 
 * @param {React.ReactNode} children - Button content
 * @param {string} variant - Button style variant (primary, secondary, success, danger)
 * @param {string} size - Button size (small, medium, large)
 * @param {boolean} disabled - Whether button is disabled
 * @param {string} type - Button type (button, submit, reset)
 * @param {string} className - Additional CSS classes
 * @param {Function} onClick - Click handler
 */
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
    const buttonClass = classNames(
        styles.button,
        styles[variant],
        styles[size],
        className
    );

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