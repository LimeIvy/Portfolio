"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Rain, rainStyle } from "@/components/rain";
import { Snow, snowStyle } from "@/components/snow";

const Grow = () => {
  const [waterCount, setWaterCount] = useState(0);
  const [isWatered, setIsWatered] = useState(false);
  const [canWater, setCanWater] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<string | null>(null);

  useEffect(() => {
    // ローカルストレージから今日水やりしたかどうかを確認
    const checkWateringStatus = () => {
      const storedWaterData = localStorage.getItem("waterData");
      const today = new Date().toDateString();

      if (storedWaterData) {
        const parsedData = JSON.parse(storedWaterData);

        // 今日水やりしたかどうかチェック
        if (parsedData.isWater && parsedData.day === today) {
          setIsWatered(true);
          setCanWater(false);
        } else {
          setIsWatered(false);
          setCanWater(true);

          // 日付が変わっていれば更新
          if (parsedData.day !== today) {
            localStorage.setItem(
              "waterData",
              JSON.stringify({
                day: today,
                isWater: false,
              })
            );
          }
        }
      } else {
        // 初めてアクセスした場合は新しいデータを作成
        localStorage.setItem(
          "waterData",
          JSON.stringify({
            day: today,
            isWater: false,
          })
        );
        setIsWatered(false);
        setCanWater(true);
      }
    };

    // DBから水やり回数を取得
    const fetchWaterCount = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log("APIリクエスト開始: 水やり回数取得");
        const response = await fetch("/api/water");
        console.log("APIレスポンス:", response.status, response.statusText);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("APIエラーレスポンス:", errorData);
          throw new Error(
            `API Error: ${response.status} ${errorData.error || response.statusText}`
          );
        }

        const data = await response.json();
        console.log("取得したデータ:", data);

        if (data && typeof data.count === "number") {
          setWaterCount(data.count);
        } else {
          console.error("予期しないレスポンス形式:", data);
          throw new Error("サーバーからの応答が不正です");
        }
      } catch (error) {
        console.error("水やり回数取得エラー:", error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    };

    checkWateringStatus();
    fetchWaterCount();
  }, []);

  const handleWatering = async () => {
    if (!canWater || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);

      console.log("APIリクエスト開始: 水やり実行");
      const response = await fetch("/api/water", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("APIレスポンス:", response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("APIエラーレスポンス:", errorData);
        throw new Error(
          `API Error: ${response.status} ${errorData.error || response.statusText}`
        );
      }

      const data = await response.json();
      console.log("水やりレスポンス:", data);

      if (data && typeof data.count === "number") {
        // 新しい水やり回数を設定
        setWaterCount(data.count);

        // ローカルストレージを更新
        localStorage.setItem(
          "waterData",
          JSON.stringify({
            day: new Date().toDateString(),
            isWater: true,
          })
        );

        // 状態を更新
        setIsWatered(true);
        setCanWater(false);
      } else {
        console.error("予期しないレスポンス形式:", data);
        throw new Error("サーバーからの応答が不正です");
      }
    } catch (error) {
      console.error("水やり実行エラー:", error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  async function getWeather() {
    const response = await fetch("/api/weather");
    const data = await response.json();
    console.log(data);
    setWeather(data.weather);
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div>
      {/* header */}
      <header className="sticky top-0 z-10 flex items-center justify-between py-5">
        <div>
          <button className="ml-12 cursor-pointer text-2xl font-bold text-gray-700">
            <Link href="/" className="">
              Koki&apos;s Portfolio
            </Link>
          </button>
        </div>
        <div className="mr-12 text-2xl font-bold text-gray-700">
          現在の名古屋の天気：
          {weather == "晴れ"
            ? "🌞"
            : weather == "雨"
              ? "🌧️"
              : weather == "雪"
                ? "❄️"
                : weather == "曇り"
                  ? "☁️"
                  : "⛅"}
        </div>
      </header>

      <main
        className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center"
        style={weather === "雪" ? snowStyle : rainStyle}
      >
        {/* エフェクト */}
        {weather == "雨" ? <Rain /> : weather == "雪" ? <Snow /> : ""}

        <div className="flex w-full max-w-md flex-col items-center justify-center">
          <h1 className="mb-5 text-4xl font-bold text-green-700">成長を支援</h1>

          {error && (
            <motion.div
              className="mb-4 w-full rounded-md bg-red-100 p-3 text-center text-red-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>エラーが発生しました: {error}</p>
              <button
                className="mt-2 text-sm underline"
                onClick={() => window.location.reload()}
              >
                ページを再読み込み
              </button>
            </motion.div>
          )}

          <div className="relative mb-5">
            {/* 植物のイラスト - 水やり回数に応じた成長段階を表示 */}
            <motion.div
              className="flex h-full w-full items-center justify-center"
              animate={{ scale: isWatered ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              {isLoading ? (
                <div className="w-40 text-center text-4xl">読み込み中...</div>
              ) : waterCount < 5 ? (
                <div className="text-[160px]">🌱</div>
              ) : waterCount < 15 ? (
                <div className="text-[160px]">🌿</div>
              ) : (
                <div className="text-[160px]">🌳</div>
              )}
            </motion.div>
          </div>

          <div className="mb-6 text-center">
            <p className="mb-3 text-xl font-semibold text-gray-700">
              合計水やり回数:{" "}
              <span className="font-bold">
                {isLoading ? "..." : `${waterCount}回`}
              </span>
            </p>
            <p className="text-sm text-gray-700">
              {isLoading
                ? "読み込み中..."
                : waterCount < 100
                  ? "もっと水をあげて応援してあげてください..."
                  : waterCount < 500
                    ? "すくすく育っています！！"
                    : "立派に成長しました！"}
            </p>
          </div>

          <motion.button
            className={`rounded-full px-6 py-3 font-medium text-white shadow-lg transition-all ${
              isLoading
                ? "cursor-not-allowed bg-gray-400"
                : canWater
                  ? "cursor-pointer bg-blue-500 hover:bg-blue-600"
                  : "cursor-not-allowed bg-gray-400"
            }`}
            whileHover={canWater && !isLoading ? { scale: 1.05 } : {}}
            whileTap={canWater && !isLoading ? { scale: 0.95 } : {}}
            onClick={handleWatering}
            disabled={!canWater || isLoading}
          >
            {isLoading
              ? "読み込み中..."
              : isWatered
                ? "今日の水やりは済んでいます"
                : "水やりをする (1日1回)"}
          </motion.button>

          <p className="mt-4 text-sm text-gray-500">
            {isLoading ? "" : isWatered ? "" : "水をあげて植物を育てましょう！"}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Grow;
