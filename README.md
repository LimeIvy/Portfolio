This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Firebase の設定

このプロジェクトはデータベースとして Firebase Firestore を使用しています。以下の手順で設定してください：

1. [Firebase Console](https://console.firebase.google.com/) で新しいプロジェクトを作成

2. Firestore データベースを作成

3. プロジェクト設定から新しいウェブアプリを追加

4. Firebase Admin SDK の秘密鍵を取得

   - プロジェクト設定 > サービスアカウント > 新しい秘密鍵の生成

5. `.env.local` ファイルを作成し、以下の環境変数を設定：

   ```
   # Firebase サーバーサイド (Admin) 設定
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email@project-id.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

   # Firebase クライアントサイド設定
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

上記の環境変数を設定したら、アプリケーションを起動できます。

## GitHub Pagesへのデプロイ

このプロジェクトはGitHub Actionsを使用してGitHub Pagesへ自動デプロイするように設定されています。以下の手順で設定してください：

1. GitHubリポジトリの「Settings」>「Secrets and variables」>「Actions」に移動し、以下の秘密情報を追加します：

   ```
   FIREBASE_PROJECT_ID
   FIREBASE_CLIENT_EMAIL
   FIREBASE_PRIVATE_KEY
   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
   ```

2. GitHubリポジトリの「Settings」>「Pages」に移動し、「Build and deployment」セクションで以下のように設定します：

   - Source: GitHub Actions

3. mainブランチにプッシュするか、手動でワークフローを実行すると、自動的にGitHub Pagesにデプロイされます。

4. デプロイされたアプリケーションは `https://<ユーザー名>.github.io/Portforio/` でアクセスできます。
