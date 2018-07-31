import {request} from '../components/button'
const fakeFetch = (jsonResult,isSuccess=true,callback = request)=>{
    const blob =new Blob(
        [JSON.stringify(jsonResult)],
        {type:'application/json'}
    );
    return(...args)=>{
        console.log('FAKE FETCH',args);
        callback.call(null,args);
        return isSuccess
        ?Promise.resolve(
            new Response(
                blob,
                {status:200,statusText:"OK"}
            )
            )
            :Promise.reject(
                new Response(
                    blob,
                    {status:400,statusText:"Bad Request"}
                )
            )
    }
};
export default fakeFetch()