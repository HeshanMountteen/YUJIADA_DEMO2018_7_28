import React,{Component}from'react'
import 'react-dom'
import URI from "urijs";
import {message,Form,Button} from 'antd';
// import {Redirect} from 'react-router-dom'
// import moment from 'moment';

class heshanButton extends Component{
    constructor(){
        super();
        this.state={
            disable:false,
        }

    }
    componentDidMount(){

    }

    //加载数据
    loadData(current){
        this.props.form.validateFields((err,value) => {
            //需要传给后端的参数
            let params = {

            }
            params.xxxxxx = Date.parse(new Date());
            for(let ele in params){
                !params[ele] && typeof params[ele] !== "number" && delete params[ele];
            }
            let url=new URI('')//接口URI
                .addQuery(params)
                .toString();
            fetch(url,{
                credentials:'include',
            }).then(res => res.json())
                .then(data =>{
                    if(data.code === '200'){
                        let newobj = [];
                        let count = 0;
                        //向后台发送请求
                        //遍历data,并将其放入newobj中
                        data.data.forEach((v,i) => {
                            newobj.push({
                                name:v.userName,
                                pwd:v.userPWD,
                                job:v.userJob,
                                salary:v.salaray,
                            })
                        })
                        console.log(newobj)
                        this.setState({
                            data:newobj,//更新this.state.data
                            isloading:false,
                            disable:true,//在响应期间，设置按钮为禁用
                            searchInfo:params,
                        })
                        //搞个定时器
                        //在响应结束后200毫秒，恢复按钮状态
                        setTimeout(()=>{this.setState({disable:false})},300);
                    }
                    else if (data.code === '414') {
                        this.setState({
                            redirect: '' //报错页面
                        });
                    }
                    else {
                        message.error(data.message)
                    }
                })
        })
    }

    //查询方法
    submit(){
        this.loadData(1);
    }

    render(){
        return(
            <div className="button-div">
                <Button className="" disabled={this.state.disable} type="primary" icon='search' onClick={()=>this.submit()}>{this.props.children}</Button>
            </div>
        )
    }
}

export default heshanButton;