import fakeFetch from './fake-fetch'
//import heshanButton from '../components/button'
const_fc = window.fetch;
describe('components/button',function () {
    let wrapper;

    afterEach(function () {
        wrapper && wrapper.unmount();
        window.fetch = _fc;
    });

    it("应该在远程请求时响应loadData",(done)=>{
        window.fetch = fakeFetch({
            data:[
                {userName:'小明',userPWD:123456,userJob:'前端开发',salary:4500},
                {userName:'小刚',userPWD:123456,userJob:'后端开发',salary:4500},
            ]
        });
        let spy = jest.fn();
        wrapper = mount(
            <heshanButton loadData={spy}/>
        );
        jest.useRealTimers();
        _clickTrigger();
        setTimeout(()=>{
            expect(wrapper.html()).toMatch(/小明/);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        }, 200);
    })
})