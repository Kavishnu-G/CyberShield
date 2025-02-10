import React from 'react';

interface TrustScoreProps {
  score: number;
}

const TrustScore: React.FC<TrustScoreProps> = ({ score }) => {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Safe';
    if (score >= 60) return 'Caution';
    return 'Unsafe';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-gray-200"
            strokeWidth="10"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            className={`stroke-current ${getScoreColor(score)}`}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 1s ease-in-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
          <span className="text-gray-500 text-sm">out of 100</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xl font-semibold">Trust Score</p>
        <p className={`text-lg font-medium ${getScoreColor(score)}`}>
          {getScoreText(score)}
        </p>
      </div>
    </div>
  );
}

export default TrustScore;