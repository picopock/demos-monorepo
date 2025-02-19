import React, { useEffect, useState } from 'react';
import { cloneDeep, partial } from "lodash-es";

const test = partial((a,b) => {
  return a + b;
}, 1, 2)

export type IDiffDemoProps = {};

export default function DiffDemo(/* props: IDiffDemoProps */) {
  const [state, setstate] = useState(cloneDeep(['A', 'B', 'C']));
  useEffect(() => {
    setTimeout(() => {
      setstate(['C', 'A', 'B']);
      console.log(test())
    }, 6000);
  }, []);
  return (
    <div className="test">
      {state.map((item) => {
        return <ChildA index={item} key={item}></ChildA>;
      })}
    </div>
  );
}

export interface IChildAProps {
  index: string;
}

class ChildA extends React.PureComponent<IChildAProps> {
  componentDidMount() {
    console.log('A:componentDidMount: ' + this.props.index);
  }
  componentDidUpdate() {
    console.log('A:componentDidUpdate' + this.props.index);
  }
  componentWillUnmount() {
    console.log('A:componentWillUnmount' + this.props.index);
  }
  render() {
    return <div>{this.props.index}</div>;
  }
}

// class ChildB extends React.PureComponent {
//   componentDidMount() {
//     console.log('B:componentDidMount')
//   }
//   componentDidUpdate() {
//     console.log('B:componentDidUpdate')
//   }
//   componentWillUnmount() {
//     console.log('B:componentWillUnmount')
//   }
//   render() {
//     return <div>B</div>
//   }
// }

// class ChildC extends React.PureComponent {
//   componentDidMount() {
//     console.log('C:componentDidMount')
//   }
//   componentDidUpdate() {
//     console.log('C:componentDidUpdate')
//   }
//   componentWillUnmount() {
//     console.log('C:componentWillUnmount')
//   }
//   render() {
//     return <div>C</div>
//   }
// }
