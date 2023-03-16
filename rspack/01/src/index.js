import * as Answer from './answer';
function render() {
  document.getElementById(
    'root'
  ).innerHTML = `the answer to the universe is ${Answer.answer}`;
}
render();
//得到用户输入的值