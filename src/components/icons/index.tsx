import React from 'react'

interface IconProps {
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
  style?: React.CSSProperties
}

type IconFC = React.FC<IconProps>

const icon = (path: React.ReactNode, viewBox = '0 0 24 24'): IconFC =>
  ({ size = 20, color = 'currentColor', strokeWidth = 1.75, className, style }) => (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {path}
    </svg>
  )

export const IconDashboard = icon(
  <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></>
)
export const IconDumbbell = icon(
  <><path d="M6.5 6.5h11M6.5 17.5h11M3 9h3v6H3zM18 9h3v6h-3zM6 9h12v6H6z"/></>
)
export const IconRun = icon(
  <><circle cx="13" cy="4" r="1.5"/><path d="m10 8 2.2 2.5L9 13h3.5l2.5 4.5m-2-9.5L15 11l3-2.5M9 21l2.5-4"/></>
)
export const IconTarget = icon(
  <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><line x1="12" y1="3" x2="12" y2="1"/><line x1="12" y1="23" x2="12" y2="21"/><line x1="3" y1="12" x2="1" y2="12"/><line x1="23" y1="12" x2="21" y2="12"/></>
)
export const IconTrendUp = icon(
  <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>
)
export const IconFlame = icon(
  <><path d="M12 2c0 0-4 4-4 8a4 4 0 0 0 8 0c0-1-.5-2-1-3 0 0-1 2-2 2-1 0-1.5-1-1.5-2S13 5 12 2z"/></>,
)
export const IconClock = icon(
  <><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></>
)
export const IconCalendar = icon(
  <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>
)
export const IconCheck = icon(
  <><polyline points="20 6 9 17 4 12"/></>
)
export const IconCheckCircle = icon(
  <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-5"/></>
)
export const IconPlus = icon(
  <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>
)
export const IconClose = icon(
  <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
)
export const IconChevronRight = icon(
  <><polyline points="9 18 15 12 9 6"/></>
)
export const IconChevronLeft = icon(
  <><polyline points="15 18 9 12 15 6"/></>
)
export const IconChevronDown = icon(
  <><polyline points="6 9 12 15 18 9"/></>
)
export const IconEdit = icon(
  <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>
)
export const IconTrash = icon(
  <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></>
)
export const IconSearch = icon(
  <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>
)
export const IconBell = icon(
  <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>
)
export const IconSettings = icon(
  <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>
)
export const IconUser = icon(
  <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>
)
export const IconMuscle = icon(
  <><path d="M6.5 13.5c-.5-1-1-3 0-5.5 0 0 1.5 2 4.5 2 1.5 0 3-.5 4-1.5 0 0 1 2.5.5 5-1 4.5-9 4.5-9-0z"/><path d="M13 6c1.5-1.5 3.5-2 5-1-.5 1.5-3 3-5 1z"/><path d="M6 13c-1.5 1-2.5 2-2 3.5 1.5.5 3.5-1 2-3.5z"/></>
)
export const IconStar = icon(
  <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>
)
export const IconActivity = icon(
  <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>
)
export const IconWeight = icon(
  <><circle cx="12" cy="9" r="3"/><path d="M12 2a7 7 0 1 0 7 7H5a7 7 0 0 0 7-7z"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="9" y1="22" x2="15" y2="22"/></>
)
export const IconMenu = icon(
  <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
)
export const IconArrowRight = icon(
  <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>
)
export const IconDroplet = icon(
  <><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></>
)
export const IconZap = icon(
  <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>
)
export const IconHeart = icon(
  <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>
)
export const IconTrophy = icon(
  <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></>
)
