
import {PureComponent} from 'react'

function loginRenderer(Oringinal) {
    return class NewComponent extends PureComponent {
        UNSAFE_componentWillMount(){
            this.beginTime = new Date().getTime();
        }
        componentDidMount(){
            this.endTime = new Date().getTime();
            const  time = this.endTime -this.beginTime;
            console.log(`当前页面渲染花费${time}ms`);
        }
        render() {
            return <Oringinal {...this.props}/>
        }
    }
}
export default loginRenderer