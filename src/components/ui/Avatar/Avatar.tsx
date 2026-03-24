import React from 'react'
import styles from './Avatar.module.css'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

export interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  status?: AvatarStatus
  className?: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  status,
  className,
}) => {
  const initials = name ? getInitials(name) : '?'

  const avatar = (
    <div
      className={[styles.avatar, styles[size], className].filter(Boolean).join(' ')}
      aria-label={alt ?? name}
      role="img"
    >
      {src ? (
        <img src={src} alt={alt ?? name ?? ''} />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>
  )

  if (!status) return avatar

  return (
    <div className={styles.wrapper}>
      {avatar}
      <span
        className={[styles.status, styles[status]].join(' ')}
        aria-label={`Status: ${status}`}
      />
    </div>
  )
}

// ─── Avatar Group ─────────────────────────────────────────────────────────────

export interface AvatarGroupProps {
  avatars: Array<Pick<AvatarProps, 'src' | 'name' | 'alt'>>
  max?: number
  size?: AvatarSize
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'sm',
}) => {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max

  return (
    <div className={styles.group}>
      {visible.map((a, i) => (
        <div key={i} className={styles.wrapper}>
          <Avatar {...a} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div className={styles.wrapper}>
          <div
            className={[styles.avatar, styles[size]].join(' ')}
            aria-label={`${overflow} more members`}
          >
            <span aria-hidden="true">+{overflow}</span>
          </div>
        </div>
      )}
    </div>
  )
}

AvatarGroup.displayName = 'AvatarGroup'
export default Avatar
