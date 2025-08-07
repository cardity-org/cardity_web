'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export default function Logo({ size = 40, showText = true, className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-2 hover:opacity-80 transition-opacity ${className}`}>
      <div className="relative">
        <Image
          src="/images/cardity-logo-simple.svg"
          alt="Cardity Logo"
          width={size}
          height={size}
          className="drop-shadow-lg"
          priority
        />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Cardity
          </span>
          <span className="text-xs text-gray-400 -mt-1">
            Smart Protocols for Dogecoin
          </span>
        </div>
      )}
    </Link>
  )
}

// 小型 Logo 组件（仅图标）
export function LogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <Link href="/" className={`hover:opacity-80 transition-opacity ${className}`}>
      <Image
        src="/images/cardity-logo-simple.svg"
        alt="Cardity"
        width={size}
        height={size}
        className="drop-shadow-lg"
        priority
      />
    </Link>
  )
} 