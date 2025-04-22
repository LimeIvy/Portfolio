"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Grow = () => {
  const [waterCount, setWaterCount] = useState(0);
  const [isWatered, setIsWatered] = useState(false);
  const [canWater, setCanWater] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ローカルストレージから今日水やりしたかどうかを確認
    const checkWateringStatus = () => {
      const storedWaterData = localStorage.getItem('waterData');
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
            localStorage.setItem('waterData', JSON.stringify({
              day: today,
              isWater: false
            }));
          }
        }
      } else {
        // 初めてアクセスした場合は新しいデータを作成
        localStorage.setItem('waterData', JSON.stringify({
          day: today,
          isWater: false
        }));
        setIsWatered(false);
        setCanWater(true);
      }
    };

    // DBから水やり回数を取得
    const fetchWaterCount = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('APIリクエスト開始: 水やり回数取得');
        const response = await fetch('/api/water');
        console.log('APIレスポンス:', response.status, response.statusText);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('APIエラーレスポンス:', errorData);
          throw new Error(`API Error: ${response.status} ${errorData.error || response.statusText}`);
        }
        
        const data = await response.json();
        console.log('取得したデータ:', data);
        
        if (data && typeof data.count === 'number') {
          setWaterCount(data.count);
        } else {
          console.error('予期しないレスポンス形式:', data);
          throw new Error('サーバーからの応答が不正です');
        }
      } catch (error) {
        console.error('水やり回数取得エラー:', error);
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
      
      console.log('APIリクエスト開始: 水やり実行');
      const response = await fetch('/api/water', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('APIレスポンス:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('APIエラーレスポンス:', errorData);
        throw new Error(`API Error: ${response.status} ${errorData.error || response.statusText}`);
      }
      
      const data = await response.json();
      console.log('水やりレスポンス:', data);
      
      if (data && typeof data.count === 'number') {
        // 新しい水やり回数を設定
        setWaterCount(data.count);
        
        // ローカルストレージを更新
        localStorage.setItem('waterData', JSON.stringify({
          day: new Date().toDateString(),
          isWater: true
        }));
        
        // 状態を更新
        setIsWatered(true);
        setCanWater(false);
      } else {
        console.error('予期しないレスポンス形式:', data);
        throw new Error('サーバーからの応答が不正です');
      }
    } catch (error) {
      console.error('水やり実行エラー:', error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* header */}
      <header className="sticky top-0 z-10 flex items-center justify-between py-5">
        <div>
          <button className="ml-6 cursor-pointer text-2xl font-bold text-gray-700">
            <Link href="/" className="">
              Matsubara
            </Link>
          </button>
        </div>
      </header>
      
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="absolute top-4 left-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-xl">
            ← ホームに戻る
          </Link>
        </div>
        
        <motion.div
          className="flex flex-col items-center justify-center max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-green-700 mb-8">植物の成長</h1>
          
          {error && (
            <motion.div 
              className="mb-4 p-3 bg-red-100 text-red-700 rounded-md w-full text-center"
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
          
          <div className="relative w-64 h-64 mb-10">
            {/* 植物のイラスト - 水やり回数に応じた成長段階を表示 */}
            <motion.div
              className="w-full h-full flex items-center justify-center"
              animate={{ scale: isWatered ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              {isLoading ? (
                <div className="text-4xl">読み込み中...</div>
              ) : waterCount < 5 ? (
                <div className="text-8xl">🌱</div>
              ) : waterCount < 15 ? (
                <div className="text-8xl">🌿</div>
              ) : (
                <div className="text-8xl">🌳</div>
              )}
            </motion.div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-xl text-gray-700 mb-2">
              総水やり回数: <span className="font-bold">{isLoading ? '...' : `${waterCount}回`}</span>
            </p>
            <p className="text-sm text-gray-500">
              {isLoading ? '読み込み中...' : 
                waterCount < 5 
                  ? "もう少し水が必要です..."
                  : waterCount < 15 
                    ? "すくすく育っています！"
                    : "立派に成長しました！"}
            </p>
          </div>
          
          <motion.button
            className={`px-6 py-3 rounded-full text-white font-medium shadow-lg transition-all
              ${isLoading 
                ? "bg-gray-400 cursor-not-allowed" 
                : canWater 
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" 
                  : "bg-gray-400 cursor-not-allowed"}`}
            whileHover={canWater && !isLoading ? { scale: 1.05 } : {}}
            whileTap={canWater && !isLoading ? { scale: 0.95 } : {}}
            onClick={handleWatering}
            disabled={!canWater || isLoading}
          >
            {isLoading 
              ? "読み込み中..." 
              : isWatered 
                ? "今日は水やり済み" 
                : "水やりをする (1日1回)"}
          </motion.button>
          
          <p className="text-sm text-gray-500 mt-4">
            {isLoading 
              ? "" 
              : isWatered 
                ? "明日また来てください！" 
                : "水をあげて植物を育てましょう！"}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Grow;