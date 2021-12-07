import React, {createRef} from 'react';

export default class Demo extends React.PureComponent {
  constructor() {
    super();
    this.$parent = createRef()
  }
  componentDidMount() {
    const $parent = this.$parent.current
    const $child = $parent.querySelector('.child');

    $parent.addEventListener('click', this.onParentDOMClick, true);
    $child.addEventListener('click', this.onChildDOMClick, false);
  }

  componentWillUnmount() {
    const $parent = this.$parent.current
    const $child = $parent.querySelector('.child');
    $parent.removeEventListener('click', this.onParentDOMClick, true);
    $child.removeEventListener('click', this.onChildDOMClick, false);
  }

  onParentDOMClick = (evt) => {
    console.log('captrue: parent dom event');
  };

  onChildDOMClick = (evt) => {
    console.log('bubble: child dom event');
  };

  onParentClick = (evt) => {
    console.log('bubble: parent react event');
  };

  onParentCaptureClick = (evt) => {
    console.log('capture: parent react event');
  };

  onChildClick = (evt) => {
    console.log('bubble: child react event');
  };
  onChildCaptureClick = (evt) => {
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
