import * as React from 'react';
import Header from './ListHeader';
import Body from './ListBody';
import Footer from './ListFooter';
import Item from './ListItem';
import classNames from 'classnames';

export interface ListProps {
  /** web only */
  prefixCls?: string;
  style?: React.CSSProperties;
  /** web only */
  className?: string;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children?: any;
}

class List extends React.Component<ListProps, any> {
  static Header: any;
  static Body: any;
  static Footer: any;
  static Item: any;

  static defaultProps = {
    prefixCls: 'am-list',
  };

  render() {
    let { prefixCls, children, className, style, title, footer } = this.props;
    const wrapCls = classNames({
      [prefixCls]: true,
      [className]: className,
    });

    return (
      <div className={wrapCls} style={style}>
        {title ? <Header>{title}</Header> : null}
        {children}
        {footer ? <Footer>{footer}</Footer> : null}
      </div>
    );
  }
}

List.Header = Header;
List.Body = Body;
List.Footer = Footer;
List.Item = Item;

export default List;
