
import './css/index.css';
import './css/var.less';
function component() {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML =  'hello webpack'// _.join(['Hello', 'webpack'], ' ');
    element.className = 'hello';

    return element;
}
document.body.appendChild(component());