export interface Blog {
  title: string;
  url: string;
  created_at: string;
}

// APIからデータを取得する関数 (コンポーネント外で定義)
export async function fetchBlogs() {
  try {
    const response = await fetch("/api/v2/items");
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const data: Blog[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}
