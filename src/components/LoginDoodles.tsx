import React from 'react';

const LoginDoodles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large background blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary-100 opacity-10 blur-3xl animate-blob" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-secondary-100 opacity-10 blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-100 opacity-10 blur-3xl animate-blob animation-delay-4000" />
      
      {/* Smaller floating blobs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary-200 opacity-20 blur-2xl animate-blob animation-delay-1000" />
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-secondary-200 opacity-20 blur-2xl animate-blob animation-delay-3000" />
      
      {/* Decorative dots pattern */}
      <div className="absolute top-1/4 right-10 space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex space-x-2">
            {[...Array(3)].map((_, j) => (
              <div
                key={j}
                className="w-2 h-2 rounded-full bg-primary-300 opacity-30"
                style={{
                  animation: `pulse ${2 + i * 0.5}s infinite ${j * 0.2}s`
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-1/4 left-10 transform -rotate-12">
        <div className="w-32 h-0.5 bg-gradient-to-r from-primary-300 to-transparent opacity-30" />
        <div className="w-24 h-0.5 bg-gradient-to-r from-primary-300 to-transparent opacity-30 mt-2" />
      </div>

      {/* Floating shapes */}
      <div className="absolute top-1/3 left-1/4 animate-float">
        <div className="w-8 h-8 rounded-lg bg-primary-200 opacity-20 transform rotate-45" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 animate-float-delayed">
        <div className="w-6 h-6 rounded-full bg-secondary-200 opacity-20" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
    </div>
  );
};

export default LoginDoodles; 