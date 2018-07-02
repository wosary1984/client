import { Http, Headers } from '@angular/http';

const ConstantsList = Object.freeze( {

    host: 'http://localhost:8080',
    //appname: 'feng.sport',
    appname: '',
    headers: new Headers( { 'Content-Type': 'application/json' } ),
    pageSize: 10,
    pageHeight: 142,
} );
export default ConstantsList;

