import { neon } from '@neondatabase/serverless';

// 環境変数からデータベースURLを取得
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL環境変数が設定されていません');
}

// Neon接続クライアントを初期化
export const sql = neon(DATABASE_URL);

// 水やりカウントを取得する関数
export async function getWaterCount() {
  try {
    // waterテーブルが存在するか確認し、存在しなければ作成
    await sql`
      CREATE TABLE IF NOT EXISTS water (
        id SERIAL PRIMARY KEY,
        count INTEGER NOT NULL DEFAULT 0
      )
    `;

    // レコードが存在するか確認
    const records = await sql`SELECT count FROM water LIMIT 1`;
    
    // レコードが存在しなければ初期レコードを作成
    if (records.length === 0) {
      await sql`INSERT INTO water (count) VALUES (0)`;
      return 0;
    }
    
    // 現在のカウントを返す
    return records[0].count;
  } catch (error) {
    console.error('水やりカウントの取得に失敗しました:', error);
    return 0;
  }
}

// 水やりカウントを増加させる関数
export async function incrementWaterCount() {
  try {
    // レコードが存在するか確認
    const records = await sql`SELECT id, count FROM water LIMIT 1`;
    
    if (records.length === 0) {
      // レコードが存在しない場合は初期レコードを作成して1を返す
      await sql`INSERT INTO water (count) VALUES (1)`;
      return 1;
    } else {
      // レコードが存在する場合はIDを指定して更新
      const id = records[0].id;
      const currentCount = records[0].count;
      const newCount = currentCount + 1;
      
      const result = await sql`
        UPDATE water 
        SET count = ${newCount}
        WHERE id = ${id}
        RETURNING count
      `;
      
      return result[0]?.count || newCount;
    }
  } catch (error) {
    console.error('水やりカウントの更新に失敗しました:', error);
    throw error; // エラーを再スローしてデバッグしやすくする
  }
} 