import { Http, Headers } from '@angular/http';

const ActionPath = Object.freeze( {
    sidebar: {
        menu: 'my/privileges'
    },
    admin: {
        users: 'api/sys/users',
        user: 'api/sys/user',
        roles: 'api/sys/roles',
        role: 'api/sys/role',
        functions: 'api/sys/privileges'
    },
    cookie: {
        jobs: 'api/cookie/jobs',
        resumejob: '/api/cookie/resumejob',
        addjob: '/api/cookie/addjob',
        pausejob: '/api/cookie/pausejob',
        deletejob: '/api/cookie/deletejob'
    },
    org: {
        company: 'api/org/company',
        company_logo: 'api/org/company/logo',
        department: 'api/org/department',
        employees:'api/org/employees'
    }

} )
export default ActionPath;