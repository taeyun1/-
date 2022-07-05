import React from "react";
import "./App.css";
import { legacy_createStore as createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

// 2. store사용 할때 반드시 reducer가 필요
// 	  reducer : store안에 state를 어떻게 바꿀것인가 (2개의 파라미터를 받음)
// 	  리덕스는 각각의 State변화를 불변하게 유지해야함 그러기 위해 현재 State를 복제하여 수정하고, 그렇게 수정시킨 State를 리턴함

// function reducer(currentState, action) {
//   // 만약 State가 정의되지 않았으면 기본값은 1로 설정
//   if (currentState === undefined) {
//     return {
//       number: 1,
//     };
//   }
//   const newState = { ...currentState };
//   if (action.type === "PLUS") {
//     newState.number++;
//   }
//   return newState;
// }

// 2. store사용 할때 반드시 reducer가 필요
function reducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    // dispatch에서 "PLUS"액션을 전달 받았을때, 실행할 코드 작성
    case "PLUS":
      newState.number++;
      return newState;
    case "MINUS":
      newState.number === 0 ? (newState.number = 0) : newState.number--;
      return newState;
    default:
      return { number: 0 };
  }
}
// 리덕스 사용
// 1. 제일 먼저 store 생성
const store = createStore(reducer);

function App() {
  return (
    <div className="container">
      <h2>Root</h2>
      <div className="grid">
        {/* 1-1) Provider에 store를 반드시 전달 (Provider안의 컴포넌트들은 store사용 가능)*/}
        <Provider store={store}>
          <Left1 />
          <Right1 />
        </Provider>
      </div>
    </div>
  );
}

function Left1() {
  console.log("Left1");
  return (
    <div>
      <h4>Left1 : </h4>
      <Left2 />
    </div>
  );
}

function Left2() {
  console.log("Left2");
  return (
    <div>
      <h4>Left2 : </h4>
      <Left3 />
    </div>
  );
}

function Left3() {
  // number값을 화면에 출력할려면 useSelector() 사용
  // useSelector는 함수를 인자로 받음. state을 입력값으로 받고 state값중에 어떤값을 사용할것인지? ex) number써주면 number를 쓰겠다
  const number = useSelector((state) => state.number);
  console.log(`Left3 : ${number}`);

  return (
    <div>
      <h4>Left3 : {number}</h4>
    </div>
  );
}

function Right1() {
  const disaptch = useDispatch();
  return (
    <div>
      <h4>Right1</h4>
      <button
        onClick={() => {
          disaptch({ type: "MINUS" });
        }}
      >
        -
      </button>
      <Right2 />
    </div>
  );
}

function Right2() {
  return (
    <div>
      <h4>Right2</h4>
      <Right3 />
    </div>
  );
}
// 4. disaptch로 값 변경
// Right3 페이지에서 버튼을 클릭했을떄, Left3 number 값을 변경하고싶으면?? useDispatch()사용
// disaptch를 선언하고, + 클릭시 disaptch에 "PLUS"액션 전달
// disaptch에 액션을 전달하면 reducer가 호출됨
function Right3() {
  const disaptch = useDispatch();
  return (
    <div>
      <h4>Right3</h4>
      <button
        onClick={() => {
          disaptch({ type: "PLUS" });
        }}
      >
        +
      </button>
    </div>
  );
}

export default App;
