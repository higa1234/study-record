# サービス名
学習記録アプリ（Study-Record）

# サービスの説明
学習記録アプリ（Study-Record）は、学習した内容と時間を記録・管理できるシンプルな学習記録アプリです。
ユーザーは学習内容と学習時間を入力して保存でき、累積学習時間も確認することができます。また登録した内容と時間は削除できます。
自己学習管理や、日々の成長記録に活用できます。

URL：https://study-record-44863.web.app/

# 使用技術
- フントエンド: React + Vite
- データベース: Supabase
- ホスティング: Firebase Hosting

# 環境設定
1. このリポジトリをクローン
```
git clone https://github.com/higa1234/study-record.git
cd study-record
```

2. .envファイルを作成し、以下を記述
```
VITE_SUPABASE_URL=あなたのSupabaseプロジェクトURL
VITE_SUPABASE_ANON_KEY=あなたのSupabase公開APIキー
```
※.envファイルはプロジェクトルートに配置します。

3. 必要なパッケージのインストール
```
npm install
```

4. 起動
```
npm run dev
```

# テスト
```
npm run test
```

# バージョン
npm ：9.6.4
node：v20.0.0

# 更新日
2025/04/29
