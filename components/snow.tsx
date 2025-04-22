// 雪のコンポーネント
export const Snow = () => {
  // 雪のアニメーションを作成する関数
  const getSnowAnimationStyle = (index: number) => {
    const leftPos = 5 + index * 5 + "%";
    const size = 8 + (index % 8) + "px"; // サイズをランダムに
    const delay = 1 + (index % 5) + "s"; // 遅延時間を短縮
    const duration = 8 + (index % 4) + "s"; // アニメーション時間を短縮

    return {
      position: "absolute",
      left: leftPos,
      top: "-50px", // 画面外から始まるように
      fontSize: size,
      animation: `snow-fall ${duration} linear infinite`,
      animationDelay: delay,
      opacity: 0, // 初期状態は透明
    } as React.CSSProperties;
  };

  return (
    <>
      <style jsx>{`
        @keyframes snow-fall {
          0% {
            transform: translate(0, -10px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(10px, 100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      <div
        className="snows"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 50 }).map((_, index) => (
          <div key={index} style={getSnowAnimationStyle(index)}>
            ❄️
          </div>
        ))}
      </div>
    </>
  );
};

// 雪のスタイル
export const snowStyle = {
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#f0f8ff",
} as React.CSSProperties;
