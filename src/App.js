import React, { useState } from 'react';
import Button from './components/Button'; // カスタムボタンコンポーネントのインポート
import './components/Button.css'; // ボタンスタイルのインポート
import { FaEdit } from 'react-icons/fa'; // react-iconsからアイコン（FaEdit）をインポート

const App = () => {
  // ローディング状態を管理するためのstate
  const [loading, setLoading] = useState(false);
  // ボタンの無効化状態を管理するためのstate
  const [disabled, setDisabled] = useState(false);

  // 「編集」ボタンがクリックされたときのハンドラ関数
  const handleEditClick = () => {
    alert('編集ボタンがクリックされました'); // クリック時にアラートを表示
  };

  // ローディング状態をトグルする関数
  const toggleLoading = () => {
    setLoading(!loading); // ローディング状態を反転させる
  };

  // ボタンの無効化状態をトグルする関数
  const toggleDisabled = () => {
    setDisabled(!disabled); // 無効化状態を反転させる
  };

  return (
    <div style={{ padding: '2rem' }}> {/* ページ全体のパディング設定 */}
      <h1>編集ボタン一覧</h1> {/* ページのタイトル */}

      {/* 「編集」ボタン */}
      <div style={{ marginBottom: '1rem' }}>
        <Button
          label="編集" // ボタンのラベルを指定
          iconLeft={<FaEdit />} // 左側にアイコンを表示
          onClick={handleEditClick} // クリック時のイベントハンドラ
          disabled={disabled} // 無効化状態を制御
          loading={loading} // ローディング状態を制御
        />
      </div>

      {/* リンクボタン */}
      <div style={{ marginBottom: '1rem' }}>
        <Button
          label="リンクボタン" // ボタンのラベルを指定
          href="https://example.com" // ボタンをリンクとして動作させる
          target="_blank" // 新しいタブでリンクを開く
          iconLeft={<FaEdit />} // 左側にアイコンを表示
        />
      </div>

      {/* サブミットボタン */}
      <div style={{ marginBottom: '1rem' }}>
        <Button
          label="サブミット" // ボタンのラベルを指定
          type="submit" // サブミットタイプのボタンとして指定
          iconRight={<FaEdit />} // 右側にアイコンを表示
        />
      </div>

      {/* ローディングと無効化を制御するボタン */}
      <div style={{ marginTop: '2rem' }}>
        {/* ローディング状態をトグル */}
        <button onClick={toggleLoading}>
          {loading ? 'ローディング停止' : 'ローディング開始'} {/* 状態に応じてテキストを変更 */}
        </button>

        {/* 無効化状態をトグル */}
        <button onClick={toggleDisabled} style={{ marginLeft: '1rem' }}>
          {disabled ? '非活性解除' : '非活性にする'} {/* 状態に応じてテキストを変更 */}
        </button>
      </div>
    </div>
  );
};

export default App;
