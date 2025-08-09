import { NextRequest } from 'next/server'
import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(_req: NextRequest) {
  const width = 1200
  const height = 630

  return new ImageResponse(
    (
      // Simple branded OG image (no external assets)
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0EA5E9, #0369A1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '1000px',
            padding: '40px',
            borderRadius: '24px',
            background: 'rgba(2, 6, 23, 0.35)',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: 'white',
              marginBottom: 16,
            }}
          >
            Cardity
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            Smart Protocols for Dogecoin
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  )
}


