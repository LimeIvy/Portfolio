import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, Transaction, Firestore } from "firebase-admin/firestore";

// サーバーサイドの場合のみFirebase Adminを初期化
let db: Firestore | null = null;

// Edge Runtimeや静的生成の環境ではなく、サーバーサイドの場合のみ初期化
if (typeof window === "undefined" && process.env.FIREBASE_PROJECT_ID) {
  try {
    // Firebase Admin SDKの初期化
    const firebaseAdminConfig = {
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    };

    // Initialize Firebase Admin
    const apps = getApps();
    const app =
      apps.length === 0 ? initializeApp(firebaseAdminConfig) : apps[0];
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase Admin初期化エラー:", error);
  }
}

// 水やりカウントを取得する関数
export async function getWaterCount() {
  try {
    // 静的生成の場合はダミーデータを返す
    if (!db) {
      console.log("静的生成環境: ダミーデータを返します");
      return 10; // 静的ビルド時のデフォルト値
    }

    // waterコレクションのcounterドキュメントを取得
    const counterRef = db.collection("water").doc("counter");
    const doc = await counterRef.get();

    // ドキュメントが存在しない場合は新規作成
    if (!doc.exists) {
      await counterRef.set({ count: 0 });
      return 0;
    }

    // カウント値を返す
    const data = doc.data();
    return data?.count || 0;
  } catch (error) {
    console.error("水やりカウントの取得に失敗しました:", error);
    return 0;
  }
}

// 水やりカウントを増加させる関数
export async function incrementWaterCount() {
  try {
    // 静的生成の場合はダミーデータを返す
    if (!db) {
      console.log("静的生成環境: ダミーデータを返します");
      return 11; // 静的ビルド時のデフォルト値+1
    }

    // トランザクションを使用してカウントを安全に更新
    const counterRef = db.collection("water").doc("counter");

    return await db.runTransaction(async (transaction: Transaction) => {
      const doc = await transaction.get(counterRef);

      // ドキュメントが存在しない場合は作成
      if (!doc.exists) {
        transaction.set(counterRef, { count: 1 });
        return 1;
      }

      // 現在のカウント値を取得
      const currentCount = doc.data()?.count || 0;
      const newCount = currentCount + 1;

      // カウント値を更新
      transaction.update(counterRef, { count: newCount });

      return newCount;
    });
  } catch (error) {
    console.error("水やりカウントの更新に失敗しました:", error);
    throw error; // エラーを再スローしてデバッグしやすくする
  }
}
