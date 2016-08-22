import * as React from 'react';
import { PropTypes } from 'react';
import classNames from 'classnames';
import { SearchBarProps, SearchBarState } from './SearchBarPropTypes';

function noop() {}

export default class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  static propTypes = {
    prefixCls: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onCancel: PropTypes.func,
    onClear: PropTypes.func,
    showCancelButton: PropTypes.bool,
    cancelText: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    prefixCls: 'am-search',
    value: '',
    placeholder: '',
    onSubmit: noop,
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    onCancel: noop,
    onClear: noop,
    showCancelButton: false,
    cancelText: '取消',
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      focus: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  onChange = (e) => {
    let value = e.target.value;
    this.setState({ value });
    this.props.onChange(value);
  };

  onFocus = (e) => {
    if (this.props.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.setState({
      focus: true,
    });
    this.props.onFocus(e.target.value);
  };

  onBlur = (e) => {
    this.setState({
      focus: false,
    });
    this.props.onBlur(e.target.value);
  };

  onCancel = () => {
    this.props.onCancel(this.state.value);
  };

  onClear = () => {
    this.setState({
      value: '',
    });
    (this.refs as any).searchInput.focus();
    this.props.onClear('');
    this.props.onChange('');
  };

  render() {
    const { prefixCls, showCancelButton, disabled, placeholder, cancelText, className } = this.props;
    const { value, focus } = this.state;

    const wrapCls = classNames({
      [`${prefixCls}`]: true,
      [className]: className,
    });

    const inputCls = classNames({
      [`${prefixCls}-input`]: true,
      [`${prefixCls}-input-focus`]: focus,
      [`${prefixCls}-start`]: value.length > 0,
    });

    return (
      <form onSubmit={this.onSubmit}>
        <div className={wrapCls}>
          <div className={inputCls}>
            <input type="search"
              className={`${prefixCls}-value`}
              value={value}
              disabled={disabled}
              placeholder={placeholder}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              ref="searchInput" />
            <a onClick={this.onClear} className={`${prefixCls}-clear`} />
          </div>
          <div
            className={`${prefixCls}-cancel`}
            style={{ display: (showCancelButton || value) ? 'block' : 'none' }}
            onClick={this.onCancel}
          >
            {cancelText}
          </div>
        </div>
      </form>
    );
  }
}
