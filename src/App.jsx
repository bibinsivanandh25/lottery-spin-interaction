import { useEffect, useState } from 'react';

const App = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showPrize, setShowPrize] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setShowPrize(false);

    const final = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    );

    const spinDuration = 3000;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      if (progress < 1) {
        setNumbers(
          Array.from({ length: 6 }, () => Math.floor(Math.random() * 10))
        );

        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setNumbers(final);
        setShowPrize(true);
      }
    };

    animate();
  };

  useEffect(() => {
    if (showPrize) {
      const interval = setInterval(() => {
        setAnimationPhase((pre) => (pre + 1) % 2);
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [showPrize]);

  return (
    <main
      className="min-h-screen w-full bg-top bg-cover bg-no-repeat relative bg-[#0B1952]"
      style={{ backgroundImage: "url('/assets/banner.png')" }}
    >
      {/* Heading Section */}
      <header className="w-full flex justify-center items-center lg:h-10vh">
        <img
          src="/assets/title.png"
          alt="heading-image"
          className="max-w-5xl w-full lg:h-48"
        />
      </header>

      {showPrize && (
        <div className="w-full flex justify-center relative">
          <h1
            className={`tracking-wide transition-all ease-in-out ${
              animationPhase
                ? 'text-white absolute -top-4 max-md:top-2'
                : 'text-red-500 absolute -top-4 max-md:top-2'
            } w-full text-center text-6xl max-md:text-4xl font-bold`}
          >
            1<span className="text-5xl max-md:text-3xl">ST</span> P
            <span className="text-5xl max-md:text-3xl">RIZE</span>
          </h1>
        </div>
      )}

      {/* Middle Section */}
      <section className="w-full flex justify-center items-center h-70vh mt-50 relative top-10 xl:top-20">
        <div className="flex justify-center w-full max-w-2xl mx-auto">
          {numbers.map((num, idx) => (
            <div
              className="flex justify-center flex-col items-center w-xs max-sm:h-130 max-lg:h-70 h-50"
              key={idx}
            >
              <div className={`relative w-full max-lg:mt-20 xl:mt-34`}>
                <img
                  src="/assets/main-counter.png"
                  alt="main-counter"
                  className="z-20 absolute max-md:top-0 -top-10 lg:-top-6 object-cover"
                />

                <span
                  className={`number text-white font-bold z-30 absolute max-lg:-top-6 -top-4 left-7.5 max-md:left-3 max-md:-top-1`}
                >
                  {num}
                </span>
              </div>
            </div>
          ))}
        </div>

        <img
          src="/assets/count-highlighter.png"
          alt="counter-highlighter"
          className={`w-175 z-10 absolute`}
        />
      </section>

      <div className="w-full flex items-center justify-center">
        <img
          src="/assets/banner-2.png"
          alt="secondary-banner"
          className="absolute bottom-38 w-full max-w-5xl
           bg-center bg-cover bg-no-repeat"
        />
      </div>

      {/* Footer Section */}
      <footer className="absolute bottom-0 left-0 w-full">
        <img
          src="/assets/base.png"
          alt="base-image"
          className="w-full object-cover relative"
        />

        <button
          className="absolute left-1/2 -translate-x-1/2 bottom-5 cursor-pointer transition-all active:translate-y-1"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          <img
            src="/assets/btn.png"
            alt="button-image"
            className="w-2xs h-22 object-contain"
          />
        </button>
      </footer>
    </main>
  );
};

export default App;
