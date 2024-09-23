import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  label = 'ボタン',
  iconLeft,
  iconRight,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  href,
  target,
  width = 'auto',
  height = 'auto',
}) => {
  const Component = href ? 'a' : 'button';

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Component
      className={`button ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}`}
      onClick={handleClick}
      href={href}
      target={target}
      type={!href ? type : undefined}
      style={{ width, height }}
      disabled={disabled}
    >
      {loading ? (
        <span className="spinner"></span>
      ) : (
        <>
          {iconLeft && <span className="icon-left">{iconLeft}</span>}
          <span className="label">{label}</span>
          {iconRight && <span className="icon-right">{iconRight}</span>}
        </>
      )}
    </Component>
  );
};

// PropTypesの定義
Button.propTypes = {
  label: PropTypes.string,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  href: PropTypes.string,
  target: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Button;
