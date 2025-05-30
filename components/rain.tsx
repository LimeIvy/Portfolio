// 雨のコンポーネント
export const Rain = () => {
  // 雨のドロップのスタイル
  const rainDropStyle = {
    position: "absolute",
    width: "1px",
    height: "150px",
    background: "#2ad",
    opacity: "0.4",
  } as React.CSSProperties;

  // 雨のアニメーションを作成する関数
  const getRainAnimationStyle = (index: number) => {
    const leftPos = 5 + index * 5 + "%";
    const delay = 3 + (index % 8) + "s";
    const duration = 8 + (index % 7) + "s";

    return {
      ...rainDropStyle,
      left: leftPos,
      top: "-180px",
      animation: `rain-anim ${duration} infinite`,
      animationDelay: delay,
    } as React.CSSProperties;
  };

  return (
    <>
      <style jsx>{`
        @keyframes rain-anim {
          0% {
            transform: translate(0px, 0px);
          }
          4% {
            transform: translate(0px, 600px);
          }
          5% {
            transform: translate(200px, 0px);
          }
          9% {
            transform: translate(200px, 600px);
          }
          10% {
            transform: translate(-100px, 0px);
          }
          14% {
            transform: translate(-100px, 600px);
          }
          15% {
            transform: translate(-200px, 0px);
          }
          19% {
            transform: translate(-200px, 600px);
          }
          20% {
            transform: translate(100px, 0px);
          }
          24% {
            transform: translate(100px, 600px);
          }
          25% {
            transform: translate(-150px, 0px);
          }
          29% {
            transform: translate(-150px, 600px);
          }
          30% {
            transform: translate(-80px, 0px);
          }
          34% {
            transform: translate(-80px, 600px);
          }
          35% {
            transform: translate(150px, 0px);
          }
          39% {
            transform: translate(150px, 600px);
          }
          40% {
            transform: translate(-60px, 0px);
          }
          44% {
            transform: translate(-60px, 600px);
          }
          45% {
            transform: translate(90px, 0px);
          }
          49% {
            transform: translate(90px, 600px);
          }
          50% {
            transform: translate(60px, 0px);
          }
          54% {
            transform: translate(60px, 600px);
          }
          55% {
            transform: translate(-60px, 0px);
          }
          59% {
            transform: translate(-60px, 600px);
          }
          60% {
            transform: translate(-40px, 0px);
          }
          64% {
            transform: translate(-40px, 600px);
          }
          65% {
            transform: translate(40px, 0px);
          }
          69% {
            transform: translate(40px, 600px);
          }
          70% {
            transform: translate(-20px, 0px);
          }
          74% {
            transform: translate(-20px, 600px);
          }
          75% {
            transform: translate(-110px, 0px);
          }
          79% {
            transform: translate(-110px, 600px);
          }
          80% {
            transform: translate(20px, 0px);
          }
          84% {
            transform: translate(20px, 600px);
          }
          85% {
            transform: translate(-20px, 0px);
          }
          89% {
            transform: translate(-20px, 600px);
          }
          90% {
            transform: translate(50px, 0px);
          }
          99% {
            transform: translate(50px, 600px);
          }
          100% {
            transform: translate(0px, 0px);
          }
        }
      `}</style>
      <div
        className="rains"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <span key={index} style={getRainAnimationStyle(index)} />
        ))}
      </div>
    </>
  );
};

// 雨のスタイル
export const rainStyle = {
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#fffcf2",
} as React.CSSProperties;
