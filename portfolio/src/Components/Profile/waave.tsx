type WaveProps = {
  fill?: string;
  flip?: boolean;
  className?: string;
};

const Wave = ({ fill = '#ffffff', flip = false, className = '' }: WaveProps) => {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full overflow-hidden leading-[0] ${
        flip ? 'rotate-180' : ''
      } ${className}`}
    >
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[100px]">
        <path
          fill={fill}
          d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
        />
      </svg>
    </div>
  );
};

export default Wave;
