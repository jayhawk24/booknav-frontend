import React from 'react'
import { Link } from 'react-router-dom'
import LogoSVG from './LogoSVG'

export interface LogoProps {
  img?: string
  imgLight?: string
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-primary-6000 ${className}`}
    >
      <LogoSVG />
      <h1>Book Boats</h1>
    </Link>
  )
}

export default Logo
