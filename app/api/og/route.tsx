import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(_req: NextRequest) {
  const width = 1200
  const height = 630

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0EA5E9, #0369A1)'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 1000,
            padding: 40,
            borderRadius: 24,
            backgroundColor: 'rgba(2,6,23,.35)'
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Cardity</div>
          <div style={{ fontSize: 28, color: 'rgba(255,255,255,.9)' }}>Smart Protocols for Dogecoin</div>
        </div>
      </div>
    ),
    { width, height }
  )
}


