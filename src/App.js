import React, { useState } from 'react';
import Button from './components/Button';
import './components/Button.css';
import { FaEdit } from 'react-icons/fa'; // react-iconsのアイコンを使用

const App = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleEditClick = () => {
    alert('編集ボタンがクリックされました');
  };

  const toggleLoading = () => {
    setLoading(!loading);
  };

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>編集ボタン一覧</h1>
      <div style={{ marginBottom: '1rem' }}>
        <Button
          label="編集"
          iconLeft={<FaEdit />}
          onClick={handleEditClick}
          disabled={disabled}
          loading={loading}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Button
          label="リンクボタン"
          href="https://example.com"
          target="_blank"
          iconLeft={<FaEdit />}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Button label="サブミット" type="submit" iconRight={<FaEdit />} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={toggleLoading}>
          {loading ? 'ローディング停止' : 'ローディング開始'}
        </button>
        <button onClick={toggleDisabled} style={{ marginLeft: '1rem' }}>
          {disabled ? '非活性解除' : '非活性にする'}
        </button>
      </div>
    </div>
  );
};

export default App;
