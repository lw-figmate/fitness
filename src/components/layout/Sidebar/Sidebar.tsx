import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.css'
import {
  IconDashboard,
  IconDumbbell,
  IconTarget,
  IconTrendUp,
  IconUser,
  IconSettings,
  IconChevronLeft,
  IconChevronRight,
  IconActivity,
  IconTrophy,
} from '../../icons'

interface NavItem {
  label: string
  path: string
  Icon: React.FC<{ size?: number; color?: string }>
}

const mainNav: NavItem[] = [
  { label: 'Dashboard',  path: '/',          Icon: IconDashboard },
  { label: 'Workouts',   path: '/workouts',  Icon: IconDumbbell },
  { label: 'Progress',   path: '/progress',  Icon: IconTrendUp },
  { label: 'Goals',      path: '/goals',     Icon: IconTarget },
  { label: 'Records',    path: '/records',   Icon: IconTrophy },
]

const secondaryNav: NavItem[] = [
  { label: 'Activity',  path: '/activity',  Icon: IconActivity },
  { label: 'Profile',   path: '/profile',   Icon: IconUser },
  { label: 'Settings',  path: '/settings',  Icon: IconSettings },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation()

  const renderNavItem = (item: NavItem) => {
    const isActive = item.path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(item.path)

    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={[styles.navItem, isActive ? styles.active : ''].filter(Boolean).join(' ')}
        aria-label={collapsed ? item.label : undefined}
        end={item.path === '/'}
      >
        <span className={styles.navIcon}>
          <item.Icon size={20} />
        </span>
        <span className={styles.navLabel}>{item.label}</span>
        {collapsed && <span className={styles.tooltip}>{item.label}</span>}
      </NavLink>
    )
  }

  return (
    <aside className={[styles.sidebar, collapsed ? styles.collapsed : styles.expanded].join(' ')}>
      {/* Logo */}
      <NavLink to="/" className={styles.logo} aria-label="FitTrack home">
        <div className={styles.logoIcon}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 9h2V6h3v8h2V3h2v12h2V7h3v2h2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className={styles.logoText}>FitTrack</span>
      </NavLink>

      {/* Main navigation */}
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.navSection}>
          <div className={styles.navSectionLabel}>Main</div>
          {mainNav.map(renderNavItem)}
        </div>
        <div className={styles.navSection}>
          <div className={styles.navSectionLabel}>Account</div>
          {secondaryNav.map(renderNavItem)}
        </div>
      </nav>

      {/* Collapse toggle */}
      <div className={styles.bottom}>
        <button
          className={styles.collapseBtn}
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
