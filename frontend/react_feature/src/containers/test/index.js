import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
  useContext,
  useReducer,
  useImperativeHandle,
  useDebugValue,
  forwardRef,
  // createRef
} from 'react'
import { Table, Select } from 'antd'

import { ThemeContext } from '../ThemeContext'

// const initialState = {
//   count: 0
// }

const initialCount = 0

function init(initialCount) {
  return { count: initialCount }
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'reset':
      return init(action.payload)
    default:
      return state
  }
}

const options = [];
for (let i = 0; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    value,
    disabled: i === 10,
  });
}

const Test = (props) => {
  const { dataSource = [], vip = [], children } = props
  const [testData, setTestData] = useState([2, 32, 1, 534, 44])
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect mount')
    console.log(vip)
    return () => {
      console.log('useEffect unmount')
    }
  }, [vip])

  useLayoutEffect(() => {
    console.log('useLayoutEffect mount')
    console.log(vip)
    return () => {
      console.log('useLayoutEffect unmount')
    };
  }, [vip])

  const renderCount = useRef(0)

  const column = useMemo(() => ({
    current: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'clientID',
        dataIndex: 'clientId',
        key: 'clientId',
        render(clientId, row) {
          return vip.includes(clientId) ? 'vip 用户' : '普通用户'
        }
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ]
  }), [vip])

  // const column = useRef([
  //   {
  //     title: '姓名',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: 'clientID',
  //     dataIndex: 'clientId',
  //     key: 'clientId',
  //     render(clientId, row) {
  //       // console.log(clientId, vip, vip.includes(clientId))
  //       return vip.includes(clientId) ? 'vip 用户' : '普通用户'
  //     }
  //   },
  //   {
  //     title: '住址',
  //     dataIndex: 'address',
  //     key: 'address',
  //   },
  // ])

  const increaseCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const inputRef = useRef(null)

  // const [state, dispatch] = useReducer(reducer, initialState)
  const [state, dispatch] = useReducer(reducer, initialCount, init)

  const [isOnline, setIsOnline] = useFriendStatus(34)

  return <div>
    {isOnline}
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={(value) => {
        console.log(`selected ${value}`);
      }}
      options={options}
    />
    <button onClick={() => {
      inputRef.current.alert(Object.keys(inputRef.current).join(' '))
      inputRef.current.focus()
    }}>focus</button>
    <div onClick={() => {
      dispatch({
        type: 'increment'
      })
      setIsOnline(!isOnline)
    }}>Count: {state.count}</div>
    <button onClick={() => {
      dispatch({
        type: 'reset',
        payload: 100
      })
    }}>reset</button>

    render {renderCount.current} times
    {
      testData.map(i => <div key={i}>{i}</div>)
    }
    <ThemedButton noRef text="I am styled by theme context!"></ThemedButton>
    <ThemedButton noRef text="sort" onClick={() => {
      // bad 这样无法触发更新
      // setTestData(testData.sort((a, b) => a - b));
      // good 必须传入一个新的对象
      setTestData(testData.slice().sort((a, b) => a - b));
    }}></ThemedButton>
    <p>{count}</p>
    <ThemedButton noRef text="click" onClick={() => {
      // 
      increaseCount()
    }}></ThemedButton>
    <br />
    <FancyInput ref={inputRef}></FancyInput>
    {children()}
    <Table dataSource={dataSource} columns={column.current}></Table>
  </div>
}

export default Test



export function ThemedButton(props, ref) {
  const { text, onClick = () => { }, noRef } = props
  const theme = useContext(ThemeContext);
  let _props = {

  }
  if (!noRef) {
    _props.ref = ref
  }

  return <button {..._props} style={{ background: theme.background, color: theme.foreground }} onClick={onClick}>
    {text}
  </button>
}


function FancyInput(props, ref) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    alert: (content) => {
      alert(content)
    },
    abc: '123'
  }))

  return <input type="text" ref={inputRef} />
}

// eslint-disable-next-line
FancyInput = forwardRef(FancyInput)

export const ThemesBth = forwardRef(ThemedButton)



function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  // 在开发者工具中的这个 Hook 旁边显示标签
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');
  return [isOnline, setIsOnline];
}