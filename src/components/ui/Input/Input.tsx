import React from 'react'
import styles from './Input.module.css'

export type InputSize = 'sm' | 'md' | 'lg'
export type InputState = 'default' | 'success' | 'error'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label */
  label?: string
  /** Size variant */
  size?: InputSize
  /** Validation state */
  state?: InputState
  /** Helper / error / success message below input */
  hint?: string
  /** Left icon */
  startIcon?: React.ReactNode
  /** Right icon */
  endIcon?: React.ReactNode
  /** Mark field as required (shows asterisk) */
  required?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      size = 'md',
      state = 'default',
      hint,
      startIcon,
      endIcon,
      required,
      id,
      className,
      ...rest
    },
    ref,
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    const wrapperClasses = [
      styles.wrapper,
      styles[size],
      state !== 'default' ? styles[state] : '',
      startIcon ? styles.hasStartIcon : '',
      endIcon ? styles.hasEndIcon : '',
    ]
      .filter(Boolean)
      .join(' ')

    const hintClass =
      state === 'success'
        ? styles.hintSuccess
        : state === 'error'
        ? styles.hintError
        : styles.hint

    return (
      <div className={[wrapperClasses, className].filter(Boolean).join(' ')}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                {' '}*
              </span>
            )}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {startIcon && (
            <span className={styles.startIcon} aria-hidden="true">
              {startIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            required={required}
            aria-invalid={state === 'error'}
            aria-describedby={hint ? `${inputId}-hint` : undefined}
            {...rest}
          />
          {endIcon && (
            <span className={styles.endIcon} aria-hidden="true">
              {endIcon}
            </span>
          )}
        </div>
        {hint && (
          <p id={`${inputId}-hint`} className={hintClass}>
            {hint}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
export default Input
