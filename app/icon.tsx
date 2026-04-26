import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          color: 'white',
          fontSize: 18,
          fontWeight: 900,
          fontFamily: 'sans-serif',
        }}
      >
        R
      </div>
    ),
    { ...size }
  )
}
