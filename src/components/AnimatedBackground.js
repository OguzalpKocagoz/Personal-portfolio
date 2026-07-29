import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  /* Sıcak, açık taban geçişi */
  background: linear-gradient(
    180deg,
    #fffaf3 0%,
    #fef4e6 35%,
    #fdead0 70%,
    #fbdcb4 100%
  );
`;

const Orb = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  will-change: transform;
`;

// Her küre: ekranın kısa kenarına göre boyut oranı, renk, bulanıklık, opaklık, hız (px/sn)
const ORBS = [
  { frac: 0.32, color: 'radial-gradient(circle at 35% 30%, #fbbf24, #f59e0b 55%, transparent 72%)', blur: 1.5, opacity: 0.6,  speed: 70 },
  { frac: 0.26, color: 'radial-gradient(circle at 35% 30%, #fdba74, #fb923c 55%, transparent 72%)', blur: 1.5, opacity: 0.58, speed: 95 },
  { frac: 0.30, color: 'radial-gradient(circle at 35% 30%, #fca5a5, #f87171 55%, transparent 72%)', blur: 2,   opacity: 0.5,  speed: 60 },
  { frac: 0.20, color: 'radial-gradient(circle at 35% 30%, #fcd34d, #fbbf24 55%, transparent 72%)', blur: 1,   opacity: 0.62, speed: 120 },
  { frac: 0.24, color: 'radial-gradient(circle at 35% 30%, #f59e0b, #d97706 55%, transparent 72%)', blur: 1.5, opacity: 0.55, speed: 85 },
  { frac: 0.16, color: 'radial-gradient(circle at 35% 30%, #fb923c, #ea580c 55%, transparent 72%)', blur: 1,   opacity: 0.6,  speed: 140 },
  { frac: 0.22, color: 'radial-gradient(circle at 35% 30%, #fde68a, #fcd34d 55%, transparent 72%)', blur: 1.5, opacity: 0.55, speed: 105 },
];

const rand = (min, max) => Math.random() * (max - min) + min;

const AnimatedBackground = () => {
  const wrapRef = useRef(null);
  const orbRefs = useRef([]);
  const stateRef = useRef([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Küre durumlarını (konum, hız, boyut) başlat
    const initState = () => {
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      const minSide = Math.min(W, H);
      stateRef.current = ORBS.map((o) => {
        const size = o.frac * minSide;
        const angle = rand(0, Math.PI * 2); // rastgele yön
        return {
          size,
          x: rand(0, Math.max(1, W - size)),
          y: rand(0, Math.max(1, H - size)),
          vx: Math.cos(angle) * o.speed,
          vy: Math.sin(angle) * o.speed,
        };
      });
      // Boyutları DOM'a uygula
      stateRef.current.forEach((s, i) => {
        const el = orbRefs.current[i];
        if (el) {
          el.style.width = `${s.size}px`;
          el.style.height = `${s.size}px`;
        }
      });
    };

    initState();

    let raf;
    let last = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05); // saniye (takılmalarda sınırla)
      last = now;
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;

      const states = stateRef.current;
      for (let i = 0; i < states.length; i++) {
        const s = states[i];
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        // Kenarlara çarpınca sek
        if (s.x <= 0) {
          s.x = 0;
          s.vx = Math.abs(s.vx);
        } else if (s.x + s.size >= W) {
          s.x = W - s.size;
          s.vx = -Math.abs(s.vx);
        }
        if (s.y <= 0) {
          s.y = 0;
          s.vy = Math.abs(s.vy);
        } else if (s.y + s.size >= H) {
          s.y = H - s.size;
          s.vy = -Math.abs(s.vy);
        }

        const el = orbRefs.current[i];
        if (el) {
          el.style.transform = `translate(${s.x}px, ${s.y}px)`;
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    // Pencere boyutu değişince küreleri ekran içinde tut
    const onResize = () => {
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      const minSide = Math.min(W, H);
      stateRef.current.forEach((s, i) => {
        s.size = ORBS[i].frac * minSide;
        s.x = Math.min(s.x, Math.max(0, W - s.size));
        s.y = Math.min(s.y, Math.max(0, H - s.size));
        const el = orbRefs.current[i];
        if (el) {
          el.style.width = `${s.size}px`;
          el.style.height = `${s.size}px`;
        }
      });
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <Wrapper ref={wrapRef} aria-hidden="true">
      {ORBS.map((o, i) => (
        <Orb
          key={i}
          ref={(el) => (orbRefs.current[i] = el)}
          style={{
            background: o.color,
            filter: `blur(${o.blur}px)`,
            opacity: o.opacity,
          }}
        />
      ))}
    </Wrapper>
  );
};

export default AnimatedBackground;
