import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Header.module.css'
import Avatar from '../../ui/Avatar/Avatar'
import { IconBell, IconSearch, IconFlame } from '../../icons'
import type { UserProfile } from '../../../types'

interface HeaderProps {
  user: UserProfile
  streak?: number
}

const routeTitles: Record<string, { title: string; subtitle?: string }> = {
  '/':          { title: 'Dashboard',     subtitle: 'Your fitness overview' },
  '/workouts':  { title: 'Workouts',      subtitle: 'Track and log your sessions' },
  '/progress':  { title: 'Progress',      subtitle: 'Your performance over time' },
  '/goals':     { title: 'Goals',         subtitle: 'Track your fitness milestones' },
  '/records':   { title: 'Personal Records', subtitle: 'Your all-time bests' },
  '/activity':  { title: 'Activity',      subtitle: 'Daily activity log' },
  '/profile':   { title: 'Profile',       subtitle: 'Manage your profile' },
  '/settings':  { title: 'Settings',      subtitle: 'App preferences' },
}

const Header: React.FC<HeaderProps> = ({ user, streak = 0 }) => {
  const { pathname } = useLocation()
  const meta = routeTitles[pathname] ?? { title: 'FitTrack' }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>{meta.title}</h1>
            {meta.subtitle && <p className={styles.subtitle}>{meta.subtitle}</p>}
          </div>
        </div>

        <div className={styles.right}>
          {streak > 0 && (
            <div className={styles.streakChip} title={`${streak} day streak`}>
              <IconFlame size={14} color="var(--color-warning)" />
              <span className={styles.streakCount}>{streak}</span>
              <span className={styles.streakLabel}>streak</span>
            </div>
          )}

          <button className={styles.iconBtn} aria-label="Search">
            <IconSearch size={18} />
          </button>

          <button className={styles.iconBtn} aria-label="Notifications">
            <IconBell size={18} />
            <span className={styles.notificationDot} aria-hidden="true" />
          </button>

          <Avatar
            name={user.name}
            src={user.avatarUrl}
            size="sm"
            status="online"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
