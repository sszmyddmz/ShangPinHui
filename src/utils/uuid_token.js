//引入uuid生成临时身份【1:身份只能有一个 2：持久化存储】
import { v4 as uuidv4 } from 'uuid';

export const getUUID = ()=>{
    //先看一下本地存储中有没有
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //如果没有用户身份
    if (!uuid_token) {
        //没有用户临时身份，创建一个
        uuid_token = uuidv4();
        //存储到本地存储当中:用户身份只需要存储一次，而且不能变
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    return uuid_token
}