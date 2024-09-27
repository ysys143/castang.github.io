
/*
함수 호출과 선언
*/
let myVariable = document.querySelector("h1");

alert("hello!");

function multiply(num1, num2) {
    let result = num1 * num2;
    return result;
}
  

/*
이벤트
*/

document.querySelector("html").onclick = function () {
    alert("Ouch! Stop poking me!");
  };


console.log(multiply(4, 7));  // 28 출력

multiply(4, 7);
multiply(20, 20);
multiply(0.5, 3);
