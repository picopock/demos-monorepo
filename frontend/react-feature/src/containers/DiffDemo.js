import React, { useEffect, useState } from 'react';


export default function DiffDemo(props) {
  const [state, setstate] = useState([
    'A','B','C'
  ])
  useEffect(() => {
    setTimeout(() => {
      setstate([
        'C',  'A', 'B',   
        ])
    }, 6000)
  }, [])
  return <div className="test">
    {state.map(item => {
      return <ChildA index={item} key={item}></ChildA>
    })}
  </div>
}

class ChildA extends React.PureComponent {
  componentDidMount() {
    console.log('A:componentDidMount: '+ this.props.index)
  }
  componentDidUpdate() {
    console.log('A:componentDidUpdate'+ this.props.index)
  }
  componentWillUnmount() {
    console.log('A:componentWillUnmount'+ this.props.index)
  }
  render() {
    return <div>{this.props.index}</div>
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