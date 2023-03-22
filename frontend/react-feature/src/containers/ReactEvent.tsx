import { createRef, PureComponent, RefObject } from 'react';

export default class Demo extends PureComponent {
  $parent: RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.$parent = createRef()
  }
  componentDidMount() {
    const _parent = this.$parent.current
    if(_parent) {
      const $child = _parent.querySelector('.child');
      _parent.addEventListener('click', this.onParentDOMClick, true);

      $child && $child.addEventListener('click', this.onChildDOMClick, false);
    }
    
  }

  componentWillUnmount() {
    const $parent = this.$parent.current
    if($parent) {
      const $child = $parent.querySelector('.child');
      $parent.removeEventListener('click', this.onParentDOMClick, true);
      $child?.removeEventListener('click', this.onChildDOMClick, false);
    }
  }

  onParentDOMClick = (evt: Event) => {
    console.log('captrue: parent dom event');
  };

  onChildDOMClick = (evt: any) => {
    console.log('bubble: child dom event');
  };

  onParentClick = (evt: any) => {
    console.log('bubble: parent react event');
  };

  onParentCaptureClick = (evt: any) => {
    console.log('capture: parent react event');
  };

  onChildClick = (evt: any) => {
    console.log('bubble: child react event');
  };
  onChildCaptureClick = (evt: any) => {
    console.log('capture: child react event');
  };

  render() {
    return (
      <div ref={this.$parent} onClickCapture={this.onParentCaptureClick} onClick={this.onParentClick}>
        <div className="child" onClickCapture={this.onChildCaptureClick} onClick={this.onChildClick}>
          react 合成事件和原生事件混合 Demo
        </div>
      </div>
    );
  }
}
