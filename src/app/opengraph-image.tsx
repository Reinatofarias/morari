import { ImageResponse } from 'next/og';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = `${SITE_NAME} — ${SITE_DESCRIPTION}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const portrait = await readFile(join(process.cwd(), 'public/assets/images/matheus-desk.jpeg'));
  const portraitUrl = `data:image/jpeg;base64,${Buffer.from(portrait).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0A0A0A',
          color: '#F5F0EB',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={portraitUrl}
          alt=""
          width="520"
          height="630"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: 520,
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: 0.72,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, #0A0A0A 0%, #0A0A0A 48%, rgba(10,10,10,0.68) 72%, rgba(10,10,10,0.20) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 72,
            top: 72,
            width: 720,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              color: '#C9A84C',
              fontSize: 24,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 34,
              fontFamily: 'Arial, sans-serif',
            }}
          >
            Psicólogo para homens que lideram
          </div>
          <div
            style={{
              fontSize: 74,
              lineHeight: 1.04,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            Não é sucesso se você perder sua família.
          </div>
          <div
            style={{
              width: 150,
              height: 3,
              background: '#C9A84C',
              marginTop: 38,
              marginBottom: 32,
            }}
          />
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: '#C8C2BB',
              fontFamily: 'Arial, sans-serif',
              width: 650,
            }}
          >
            Saúde emocional masculina, autodomínio e presença para quem carrega pressão em silêncio.
          </div>
          <div
            style={{
              marginTop: 46,
              fontSize: 24,
              color: '#C9A84C',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {SITE_NAME}
          </div>
        </div>
      </div>
    ),
    size
  );
}
