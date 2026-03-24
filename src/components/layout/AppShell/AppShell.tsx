import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import styles from './AppShell.module.css'
import type { UserProfile } from '../../../types'

interface AppShellProps {
  user: UserProfile
  streak?: number
  children: React.ReactNode
}

const AppShell: React.FC<AppShellProps> = ({ user, streak, children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={styles.shell}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((p) => !p)} />
      <div className={[styles.content, collapsed ? styles.collapsed : styles.expanded].join(' ')}>
        <Header user={user} streak={streak} />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}

export default AppShell
