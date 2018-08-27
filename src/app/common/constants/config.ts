import { Http, Headers } from '@angular/http';

const ConstantsList = Object.freeze( {

    //host: 'http://localhost:8080',
    host:'http://fengsports-env.3e4mhepwmk.ap-northeast-2.elasticbeanstalk.com',
    //appname: 'feng.sport',
    appname: '',
    headers: new Headers( { 'Content-Type': 'application/json' } ),
    pageSize: 10,
    pageHeight: 142,
} );
export default ConstantsList;

