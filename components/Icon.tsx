'use client'

interface IconProps {
  name: string
  size?: number
  stroke?: number
  className?: string
  style?: React.CSSProperties
}

export function Icon({ name, size = 16, stroke = 1.6, className = '', style }: IconProps) {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    className, style,
  }
  switch (name) {
    case 'arrow-right':
      return <svg {...props}><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>
    case 'arrow-up-right':
      return <svg {...props}><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
    case 'calendar':
      return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
    case 'calendar-days':
      return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>
    case 'home':
      return <svg {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>
    case 'users':
      return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    case 'settings':
      return <svg {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
    case 'check':
      return <svg {...props}><path d="M20 6 9 17l-5-5"/></svg>
    case 'check-circle':
      return <svg {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
    case 'message-square':
      return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    case 'file-text':
      return <svg {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>
    case 'receipt':
      return <svg {...props}><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><path d="M16 8H8M16 12H8M13 16H8"/></svg>
    case 'pix':
      return <svg {...props}><path d="M12 2 22 12l-10 10L2 12z"/><path d="m7 7 5 5 5-5M7 17l5-5 5 5"/></svg>
    case 'sparkles':
      return <svg {...props}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M5.5 18.5l2-2M16.5 7.5l2-2"/><circle cx="12" cy="12" r="2.5"/></svg>
    case 'highlighter':
      return <svg {...props}><path d="m9 11-6 6v3h3l6-6"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.83 0l-5.18-5.17a2 2 0 0 1 0-2.83L14 4"/></svg>
    case 'wallet':
      return <svg {...props}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>
    case 'drive':
      return <svg {...props}><path d="M7.71 3.5 1.15 15l3.42 6h6.86l3.43-6L8.29 3.5z"/><path d="M22.85 15 16.29 3.5h-6.86"/><path d="m4.57 21 3.43-6h14.85"/></svg>
    case 'whatsapp':
      return <svg {...props}><path d="M20.52 3.48A12 12 0 0 0 3.5 20.5L2 22l1.5-1.5"/><path d="M3.5 20.5 2 22l5.05-1.35a10 10 0 0 0 4.95 1.35h.01a10 10 0 0 0 7.94-15.94"/><path d="M9 9c.5-1 1.5-1 2 0l1 2-1 1c.5 1 1.5 2 2.5 2.5l1-1 2 1c1 .5 1 1.5 0 2-1 1-2.5 1-4 0a8 8 0 0 1-4-4c-1-1.5-1-3 0-4z"/></svg>
    case 'lock':
      return <svg {...props}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    case 'plus':
      return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>
    case 'chevron-left':
      return <svg {...props}><path d="m15 18-6-6 6-6"/></svg>
    case 'chevron-right':
      return <svg {...props}><path d="m9 18 6-6-6-6"/></svg>
    case 'chevron-down':
      return <svg {...props}><path d="m6 9 6 6 6-6"/></svg>
    case 'search':
      return <svg {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    case 'bell':
      return <svg {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
    case 'shield':
      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
    case 'pencil':
      return <svg {...props}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>
    case 'video':
      return <svg {...props}><path d="m22 8-6 4 6 4V8z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
    default:
      return null
  }
}
