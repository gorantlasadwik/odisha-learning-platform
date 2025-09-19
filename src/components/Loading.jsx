import React from 'react';
import KonarkWheel from './KonarkWheel';

const Loading = ({ message = "Loading...", size = 80 }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center z-50">
      <div className="text-center">
        <KonarkWheel size={size} className="mx-auto mb-6" />
        <div className="text-lg font-medium text-gray-700 mb-2 odia-text">
          {message}
        </div>
        <div className="text-sm text-gray-500">
          Powered by Odisha's Cultural Heritage
        </div>
        {/* Cultural pattern background */}
        <div className="absolute inset-0 opacity-5 sambalpuri-bg pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Loading;