import React from 'react'
import styles from './Button.module.css'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'danger'
  | 'dangerGhost'
  | 'success'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant
  /** Control size */
  size?: ButtonSize
  /** Show loading spinner and disable interaction */
  loading?: boolean
  /** Stretch to fill container width */
  fullWidth?: boolean
  /** Render as icon-only (square button) */
  iconOnly?: boolean
  /** Left-side icon */
  startIcon?: React.ReactNode
  /** Right-side icon */
  endIcon?: React.ReactNode
  /** Render as anchor element */
  as?: 'button' | 'a'
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      iconOnly = false,
      startIcon,
      endIcon,
      children,
      className,
      disabled,
      as: Tag = 'button',
      href,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth ? styles.fullWidth : '',
      loading ? styles.loading : '',
      iconOnly ? styles.iconOnly : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    const content = (
      <>
        {loading ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          startIcon && <span aria-hidden="true">{startIcon}</span>
        )}
        {!iconOnly && children && <span>{children}</span>}
        {endIcon && !loading && <span aria-hidden="true">{endIcon}</span>}
      </>
    )

    if (Tag === 'a') {
      return (
        <a
          href={href}
          className={classes}
          aria-disabled={disabled || loading}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...rest}
      >
        {content}
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
