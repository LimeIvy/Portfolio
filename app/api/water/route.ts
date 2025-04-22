import { NextResponse } from "next/server";
import { getWaterCount, incrementWaterCount } from "@/lib/db";

// GETリクエスト - 現在の水やり回数を取得
export async function GET() {
  try {
    const count = await getWaterCount();
    return NextResponse.json({ count, success: true });
  } catch (error) {
    console.error("水やり回数の取得に失敗しました:", error);
    return NextResponse.json(
      {
        error: "水やり回数の取得に失敗しました",
        details: error instanceof Error ? error.message : String(error),
        success: false,
      },
      { status: 500 }
    );
  }
}

// POSTリクエスト - 水やり回数を増加
export async function POST() {
  try {
    const newCount = await incrementWaterCount();
    console.log("水やり成功: 新しいカウント =", newCount);
    return NextResponse.json({ count: newCount, success: true });
  } catch (error) {
    console.error("水やり回数の更新に失敗しました:", error);
    return NextResponse.json(
      {
        error: "水やり回数の更新に失敗しました",
        details: error instanceof Error ? error.message : String(error),
        success: false,
      },
      { status: 500 }
    );
  }
}
