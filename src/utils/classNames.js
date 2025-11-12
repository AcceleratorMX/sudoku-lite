/**
 * Combine multiple class names into a single string
 * Filters out falsy values (null, undefined, false, '')
 * 
 * @param {...(string|null|undefined|false)} classes - Class names to combine
 * @returns {string} Combined class names
 * 
 * @example
 * classNames('btn', 'btn-primary') // 'btn btn-primary'
 * classNames('btn', isActive && 'active') // 'btn active' or 'btn'
 * classNames('btn', null, undefined, 'primary') // 'btn primary'
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Combine CSS module styles with conditional classes
 * 
 * @param {...(string|Object|null|undefined|false)} args - Classes and conditions
 * @returns {string} Combined class names
 * 
 * @example
 * cn(styles.btn, styles.primary) // 'btn_abc123 primary_def456'
 * cn(styles.btn, isActive && styles.active) // conditional class
 * cn(styles.btn, { [styles.disabled]: isDisabled }) // object notation
 */
export function cn(...args) {
  const classes = [];
  
  for (const arg of args) {
    if (!arg) continue;
    
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object' && !Array.isArray(arg)) {
      // Handle object notation: { className: condition }
      for (const [key, value] of Object.entries(arg)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }
  
  return classes.join(' ');
}

export default classNames;
