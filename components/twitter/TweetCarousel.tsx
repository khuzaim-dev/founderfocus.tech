'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'

export function TweetCarousel({ children }: { children: React.ReactNode }) {
  return (
    <Marquee
      speed={35}
      pauseOnHover={true}
      gradient={false}
      style={{ overflow: 'hidden' }}
    >
      <div style={{ display: 'flex', gap: '20px', paddingRight: '20px', paddingLeft: '20px', alignItems: 'flex-start' }}>
        {children}
      </div>
    </Marquee>
  )
}
