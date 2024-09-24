# React ボタンコンポーネント

このプロジェクトでは、再利用可能なボタンコンポーネントを実装しています。ボタンには、ローディング状態、非活性状態、リンクとしての動作など、様々な機能が備わっています。また、左右にアイコンを配置することができ、いくつかのボタンタイプをサポートしています。

## 要件と実装

### 1. ボタンラベルはテキストのみ、または左右にアイコンを付けることができる
- **要件**: ボタンのラベルはテキストのみ、または左か右にアイコンを付けることができます。
- **実装**: `Button` コンポーネント内 (`src/components/Button.js`) で、`iconLeft` および `iconRight` の `props` を受け取り、それらをラベルの隣に表示します。
  - 処理:
    ```jsx
    {iconLeft && <span className="icon-left">{iconLeft}</span>}
    <span className="label">{label}</span>
    {iconRight && <span className="icon-right">{iconRight}</span>}
    ```
    このコードは、アイコンが渡されている場合（`iconLeft` または `iconRight` が存在する場合）に、そのアイコンを表示します。  
  - 使用例:
    ```jsx
    <Button label="編集" iconLeft={<FaEdit />} />
    <Button label="送信" iconRight={<FaCheck />} />
    ```

### 2. ボタンには4種類の状態がある: 非活性、ローディング中、ホバー時、フォーカス時
- **要件**: ボタンは、非活性、ローディング中、ホバー時、フォーカス時の4つの状態をサポートする必要があります。
- **実装**: 状態の管理は `Button` コンポーネント (`src/components/Button.js`) 内で行い、状態に応じてクラスを付与します。
  - **非活性状態**: `disabled` プロパティを使用して制御します。`disabled` が `true` の場合、ボタンに `disabled` クラスが適用され、スタイルが変更されます。
    - 処理:
      ```jsx
      className={`button ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}`}
      ```
    - **対応するCSS** (`Button.css`):
      ```css
      .button.disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
      ```
  - **ローディング状態**: `loading` プロパティを使用して制御します。`loading` が `true` の場合、ラベルの代わりにスピナーが表示されます。
    - 処理:
      ```jsx
      {loading ? <span className="spinner"></span> : <span className="label">{label}</span>}
      ```
    - **対応するCSS** (`Button.css`):
      ```css
      .button .spinner {
        width: 1rem;
        height: 1rem;
        border: 2px solid black;
        border-top: 2px solid #fff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      ```
  - **ホバー時**: CSSの `:hover` セレクタで処理します。
    - **対応するCSS** (`Button.css`):
      ```css
      .button:hover {
        background-color: #f0f0f0;
      }
      ```
  - **フォーカス時**: CSSの `:focus` セレクタで処理します。
    - **対応するCSS** (`Button.css`):
      ```css
      .button:focus {
        outline: 2px solid #0056b3;
      }
      ```

### 3. ボタンのラベルは外部から指定できる
- **要件**: ボタンのラベルは外部からカスタマイズ可能でなければなりません。
- **実装**: `label` プロパティが `Button` コンポーネントに渡され、ラベルのテキストを動的に制御します。これは `App.js` から `Button` コンポーネントに `label` を渡すことで行われます。
  - 処理（`App.js` から `Button` に渡される）:
    ```jsx
    <Button label="送信" />
    ```
  - `Button.js` 内での受け取り:
    ```jsx
    <span className="label">{label}</span>
    ```

### 4. ボタンクリック時のハンドラーは外部から指定できる
- **要件**: ボタンクリック時に発火する関数は、外部から指定できる必要があります。
- **実装**: `onClick` プロパティが `Button` コンポーネントに渡され、クリックイベントを処理します。この処理は `App.js` で `Button` に `onClick` を渡すことで行われます。
  - 処理（`App.js` 内）:
    ```jsx
    const handleClick = () => {
      alert('ボタンがクリックされました！');
    };
  
    <Button label="クリック" onClick={handleClick} />
    ```
  - `Button.js` 内のクリックイベント処理:
    ```jsx
    const handleClick = (e) => {
      if (disabled || loading) {
        e.preventDefault();
        return;
      }
      if (onClick) {
        onClick();
      }
    };
    ```

### 5. ボタンの色や形はカスタマイズできない
- **要件**: ボタンの色や形は外部からカスタマイズできないようにする必要があります。
- **実装**: ボタンのスタイルはCSSで固定されており、`props` で変更できないようにしています。`Button.css` でデザインが固定されています。
  - **対応するCSS** (`Button.css`):
    ```css
    .button {
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #000;
    }
    ```

### 6. ボタンの幅と高さは親コンポーネントから制御できる
- **要件**: ボタンの幅と高さは親コンポーネントから設定可能でなければなりません。
- **実装**: `width` と `height` プロパティを `Button` コンポーネントに渡すことで、親からボタンのサイズをカスタマイズできます。
  - 処理（`App.js` 内）:
    ```jsx
    <Button label="カスタムサイズ" width="200px" height="50px" />
    ```
  - `Button.js` 内での受け取り:
    ```jsx
    style={{ width, height }}
    ```

### 7. フォーム内でサブミットボタンとして機能する
- **要件**: ボタンは `submit` タイプとして、フォームの送信をサポートする必要があります。
- **実装**: `type` プロパティに `submit` を指定することで、フォーム内でサブミットボタンとして使用できます。`Button.js` 内で `type` プロパティが適切に処理されています。
  - 処理:
    ```jsx
    <Button label="送信" type="submit" />
    ```

### 8. ボタンにURLを渡すとリンクとして振る舞い、ターゲットを指定できる
- **要件**: ボタンに `href` を指定した場合、リンクとして振る舞い、`target` を指定することで別タブで開くことができる必要があります。
- **実装**: `href` プロパティが渡された場合、`Button` コンポーネントは `button` タグの代わりに `a` タグとしてレンダリングされます。
  - 処理:
    ```jsx
    const Component = href ? 'a' : 'button';
    ```
  - `App.js` 内での使用例:
    ```jsx
    <Button label="サイトへ" href="https://example.com" target="_blank" />
    ```

### 9. ボタンコンポーネントは宣言的に使える
- **要件**: 他の開発者が簡単に使えるように、ボタンコンポーネントは宣言的に記述できる必要があります。
- **実装**: `label`, `iconLeft`, `iconRight`, `onClick` などのプロパティを受け取ることで、様々な状況で簡単に使用できるように設計されています。
  - 使用例（`App.js` 内）:
    ```jsx
    <Button label="クリック" iconLeft={<FaEdit />} onClick={handleClick} />
    ```

## デプロイ

- このプロジェクトはGitHub Pagesを使用してデプロイされています。`gh-pages` ブランチを使用して、プロジェクトのライブバージョンをホストしています。以下のスクリプトが `package.json` に含まれています。

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

- プロジェクトをデプロイするには、以下のコマンドを実行します。

```
npm run deploy
```

-デプロイ後、以下のURLでプロジェクトにアクセスできます:

```
[https://{username}.github.io/{repository-name}](https://matsu128.github.io/react-button-component/)
```


### 説明:
- **ファイルと処理の具体的な説明**を各要件に対して行い、どのファイルのどの部分で要件が満たされているかを示しています。
- **他のファイルとの関係**も適切に記載して、どのように関連しているかが分かるようにしました。

これで、どの処理がどこで行われているかを正確に理解できるようになり、チーム開発の際に他の開発者も容易にプロジェクトを把握できる内容となっています。





