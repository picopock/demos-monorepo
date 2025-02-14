import { PureComponent, type RefObject, createRef } from 'react';

export default class Demo extends PureComponent {
  $parent: RefObject<HTMLDivElement | null>;
  constructor(props: any) {
    super(props);
    this.$parent = createRef();
  }
  componentDidMount() {
    const _parent = this.$parent.current;
    if (_parent) {
      const $child = _parent.querySelector('.child');
      _parent.addEventListener('click', this.onParentDOMClick, true);

      $child && $child.addEventListener('click', this.onChildDOMClick, false);
    }
  }

  componentWillUnmount() {
    const $parent = this.$parent.current;
    if ($parent) {
      const $child = $parent.querySelector('.child');
      $parent.removeEventListener('click', this.onParentDOMClick, true);
      $child?.removeEventListener('click', this.onChildDOMClick, false);
    }
  }

  onParentDOMClick = () => {
    console.log('captrue: parent dom event');
  };

  onChildDOMClick = () => {
    console.log('bubble: child dom event');
  };

  onParentClick = () => {
    console.log('bubble: parent react event');
  };

  onParentCaptureClick = () => {
    console.log('capture: parent react event');
  };

  onChildClick = () => {
    console.log('bubble: child react event');
  };
  onChildCaptureClick = () => {
    console.log('capture: child react event');
  };

  render() {
    return (
      <div
        ref={this.$parent}
        onClickCapture={this.onParentCaptureClick}
        onClick={this.onParentClick}
      >
        <div
          className="child"
          onClickCapture={this.onChildCaptureClick}
          onClick={this.onChildClick}
        >
          react 合成事件和原生事件混合 Demo
        </div>
      </div>
    );
  }
}
