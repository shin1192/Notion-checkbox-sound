# Notion チェックボックス効果音

Notion のチェックボックスをクリックすると、お好きな効果音が鳴る Tampermonkey スクリプトです。

## 特徴

- ✅ ページ内・データベース内のチェックボックスに対応
- ✅ トグルや上部ツールバーは誤反応しないよう除外
- ✅ 音声ファイルは Base64 でスクリプト内に埋め込むため、外部通信なし
- ✅ Notion の CSP に対応（Blob URL 経由で再生）

## インストール手順

### 1. Tampermonkey をインストール
[Tampermonkey 公式](https://www.tampermonkey.net/) からブラウザ拡張機能をインストール。

### 2. スクリプトを追加
`notion-checkbox-sound.user.js` の内容を Tampermonkey の新規スクリプトに貼り付け。

### 3. 音声ファイルを Base64 化
お好きな MP3 ファイル（1〜3秒程度の短いものを推奨）を以下のようなサイトで Base64 に変換：
- https://www.base64encode.org/
- https://base64.guru/converter/encode/audio

### 4. Base64 をコードに埋め込む
スクリプト内の以下の行の `''` の中に Base64 文字列を貼り付け：

\`\`\`javascript
const SOUND_BASE64 = 'ここに貼り付け';
\`\`\`

### 5. 保存して Notion をリロード
チェックボックスをクリックすると音が鳴ります。

## 設定

| 変数 | 説明 | デフォルト |
|------|------|-----------|
| `SOUND_BASE64` | 音声ファイルの Base64 文字列 | 空 |
| `VOLUME` | 音量（0.0〜1.0） | 0.8 |

## 著作権について

**このスクリプトは音声ファイルを含みません。** 各自でお好きな音声を Base64 に変換して埋め込んでご利用ください。

⚠️ **注意：** 著作権のある音源（ゲーム・アニメ・映画の効果音など）を埋め込んだ場合、そのスクリプトを他人と共有・再配布することは著作権法違反となる可能性があります。**私的使用の範囲でのみ**ご利用ください。

著作権フリーの音源は以下から入手できます：
- [効果音ラボ](https://soundeffect-lab.info/)
- [魔王魂](https://maou.audio/)
- [OtoLogic](https://otologic.jp/)

## ライセンス

MIT License（詳細は LICENSE ファイルをご覧ください）
