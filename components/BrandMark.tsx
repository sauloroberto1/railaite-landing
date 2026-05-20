interface BrandMarkProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export function BrandMark({ size = 'sm' }: BrandMarkProps) {
  return (
    <span className={`brand-mark brand-mark--${size}`} aria-hidden="true">
      <span className="brand-mark__corner brand-mark__corner--tl"></span>
      <span className="brand-mark__corner brand-mark__corner--tr"></span>
      <span className="brand-mark__corner brand-mark__corner--bl"></span>
      <span className="brand-mark__corner brand-mark__corner--br"></span>
      <span className="brand-mark__dot"></span>
    </span>
  )
}
