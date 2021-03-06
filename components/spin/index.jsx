import React from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { isCssAnimationSupported } from 'css-animation';

export default class Spin extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-spin',
    spining: true,
  }

  static propTypes = {
    className: React.PropTypes.string,
    size: React.PropTypes.oneOf(['small', 'default', 'large']),
  }

  isNestedPattern() {
    return !!(this.props && this.props.children);
  }

  componentDidMount() {
    if (!isCssAnimationSupported) {
      // Show text in IE8/9
      findDOMNode(this).className += ` ${this.props.prefixCls}-show-text`;
    }
  }

  render() {
    const { className, size, prefixCls, tip } = this.props;

    let spinClassName = classNames({
      [prefixCls]: true,
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [className]: !!className,
      [`${prefixCls}-spining`]: this.props.spining,
      [`${prefixCls}-show-text`]: !!this.props.tip,
    });

    const spinElement = (
      <div className={spinClassName}>
        <span className={`${prefixCls}-dot ${prefixCls}-dot-first`} />
        <span className={`${prefixCls}-dot ${prefixCls}-dot-second`} />
        <span className={`${prefixCls}-dot ${prefixCls}-dot-third`} />
        <div className={`${prefixCls}-text`}>{tip || '加载中...'}</div>
      </div>
    );

    if (this.isNestedPattern()) {
      return (
        <div className={this.props.spining ? (`${prefixCls}-nested-loading`) : ''}>
          {spinElement}
          <div className={`${prefixCls}-container`}>
            {this.props.children}
          </div>
        </div>
      );
    }
    return spinElement;
  }
}
