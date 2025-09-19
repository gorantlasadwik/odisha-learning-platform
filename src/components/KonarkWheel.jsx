import React from 'react';

const KonarkWheel = ({ size = 80, className = "" }) => {
  return (
    <div className={`konark-wheel ${className}`} style={{ width: size, height: size }}>
      <svg 
        viewBox="0 0 100 100" 
        width={size} 
        height={size}
        className="animate-spin-slow"
      >
        {/* Outer rim */}
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          fill="none" 
          stroke="url(#konarkGradient)" 
          strokeWidth="2"
        />
        
        {/* Inner decorative circles */}
        <circle 
          cx="50" 
          cy="50" 
          r="38" 
          fill="none" 
          stroke="url(#konarkGradient)" 
          strokeWidth="1"
          opacity="0.7"
        />
        
        <circle 
          cx="50" 
          cy="50" 
          r="28" 
          fill="none" 
          stroke="url(#konarkGradient)" 
          strokeWidth="1"
          opacity="0.5"
        />
        
        {/* Spokes - 24 like the original Konark wheel */}
        {Array.from({ length: 24 }, (_, i) => {
          const angle = (i * 360) / 24;
          const x1 = 50 + 18 * Math.cos((angle * Math.PI) / 180);
          const y1 = 50 + 18 * Math.sin((angle * Math.PI) / 180);
          const x2 = 50 + 45 * Math.cos((angle * Math.PI) / 180);
          const y2 = 50 + 45 * Math.sin((angle * Math.PI) / 180);
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#konarkGradient)"
              strokeWidth="1.5"
              opacity={i % 2 === 0 ? 0.8 : 0.6}
            />
          );
        })}
        
        {/* Central hub */}
        <circle 
          cx="50" 
          cy="50" 
          r="12" 
          fill="url(#konarkGradient)"
          opacity="0.9"
        />
        
        {/* Central symbol */}
        <circle 
          cx="50" 
          cy="50" 
          r="6" 
          fill="none" 
          stroke="#FFF" 
          strokeWidth="1"
        />
        
        {/* Decorative outer elements */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 360) / 8;
          const x = 50 + 42 * Math.cos((angle * Math.PI) / 180);
          const y = 50 + 42 * Math.sin((angle * Math.PI) / 180);
          
          return (
            <circle
              key={`outer-${i}`}
              cx={x}
              cy={y}
              r="2"
              fill="url(#konarkGradient)"
              opacity="0.8"
            />
          );
        })}
        
        {/* Gradient definitions */}
        <defs>
          <radialGradient id="konarkGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#FF9933', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#CC0000', stopOpacity: 1 }} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default KonarkWheel;