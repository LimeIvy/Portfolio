import { NextResponse } from "next/server";

interface QiitaArticle {
  title: string;
  url: string;
  created_at: string;
}

interface QiitaResponse {
  title: string;
  url: string;
  created_at: string;
}

export async function GET() {
  const blogs = `https://qiita.com/api/v2/items?page=1&per_page=20&query=user%3ALimeIvy`;
  const res = await fetch(blogs);
  const data = await res.json();

  // タイトルとURLのみを抽出
  const articles: QiitaArticle[] = data.map((article: QiitaResponse) => ({
    title: article.title,
    url: article.url,
    created_at: new Date(article.created_at).toISOString().split("T")[0],
  }));

  return NextResponse.json(articles);
}
