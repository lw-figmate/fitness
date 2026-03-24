/**
 * Motion / Animation Design Tokens
 */

export const duration = {
  instant:  '0ms',
  fast:     '100ms',
  normal:   '200ms',
  moderate: '300ms',
  slow:     '400ms',
  relaxed:  '500ms',
} as const

export const easing = {
  linear:    'linear',
  easeIn:    'cubic-bezier(0.4, 0, 1, 1)',
  easeOut:   'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
  decelerate:'cubic-bezier(0, 0, 0.2, 1)',
  accelerate:'cubic-bezier(0.4, 0, 1, 1)',
} as const

export const transition = {
  fast:     `all ${duration.fast} ${easing.easeInOut}`,
  normal:   `all ${duration.normal} ${easing.easeInOut}`,
  moderate: `all ${duration.moderate} ${easing.easeInOut}`,
  colors:   `background-color ${duration.normal} ${easing.easeInOut}, border-color ${duration.normal} ${easing.easeInOut}, color ${duration.normal} ${easing.easeInOut}`,
  transform:`transform ${duration.moderate} ${easing.spring}`,
  opacity:  `opacity ${duration.normal} ${easing.easeInOut}`,
} as const
