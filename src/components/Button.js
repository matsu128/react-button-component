import React from 'react';
import PropTypes from 'prop-types'; // PropTypesを使用して型を定義

const Button = ({
  label = 'ボタン', // ボタンに表示されるテキスト
  iconLeft, // ボタンの左側に表示するアイコン（オプション）
  iconRight, // ボタンの右側に表示するアイコン（オプション）
  onClick, // ボタンがクリックされたときのハンドラ関数
  disabled = false, // ボタンの無効化状態を管理（デフォルトは無効化されていない）
  loading = false, // ボタンのローディング状態を管理（デフォルトはローディングではない）
  type = 'button', // ボタンのタイプを指定（デフォルトは通常のボタン）
  href, // リンクとして動作する場合のURL（オプション）
  target, // リンクを新しいタブで開くかどうかを指定（オプション）
  width = 'auto', // ボタンの幅（デフォルトは自動調整）
  height = 'auto', // ボタンの高さ（デフォルトは自動調整）
}) => {
  // ボタンかリンクかを動的に決定（hrefが存在する場合はaタグとして表示）
  const Component = href ? 'a' : 'button';

  // クリック時の処理（無効化やローディング中はクリックを防ぐ）
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault(); // 無効化やローディング中はデフォルトのクリック動作を無効化
      return;
    }
    if (onClick) {
      onClick(); // onClick関数が渡されている場合に実行
    }
  };

  return (
    <Component
      className={`button ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}`} // ボタンに適切なクラスを割り当てる
      onClick={handleClick} // クリック時のハンドラを設定
      href={href} // リンクがある場合はhrefを設定
      target={target} // リンクを新しいタブで開くかどうかを設定
      type={!href ? type : undefined} // ボタンのtypeを指定、リンクの場合は無効
      style={{ width, height }} // ボタンの幅と高さをスタイルで指定
      disabled={disabled} // ボタンが無効化されている場合はdisabledを設定
    >
      {/* ローディング中はスピナーを表示し、そうでなければアイコンとラベルを表示 */}
      {loading ? (
        <span className="spinner"></span> // ローディング中に表示されるスピナー
      ) : (
        <>
          {iconLeft && <span className="icon-left">{iconLeft}</span>} {/* 左側のアイコン */}
          <span className="label">{label}</span> {/* ボタンのラベル */}
          {iconRight && <span className="icon-right">{iconRight}</span>} {/* 右側のアイコン */}
        </>
      )}
    </Component>
  );
};

// PropTypesによる型の定義
Button.propTypes = {
  label: PropTypes.string, // ボタンに表示されるテキスト
  iconLeft: PropTypes.node, // 左側に表示するアイコン（Reactノード）
  iconRight: PropTypes.node, // 右側に表示するアイコン（Reactノード）
  onClick: PropTypes.func, // クリック時に実行される関数
  disabled: PropTypes.bool, // ボタンが無効化されているかどうか
  loading: PropTypes.bool, // ボタンがローディング中かどうか
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // ボタンのtype属性
  href: PropTypes.string, // リンクとしてのURL
  target: PropTypes.string, // リンクのターゲット属性（例: _blank）
  width: PropTypes.string, // ボタンの幅
  height: PropTypes.string, // ボタンの高さ
};

export default Button;
