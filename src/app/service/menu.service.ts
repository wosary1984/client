import {Injectable} from '@angular/core';

@Injectable()
export class MenuService {

  constructor() {}

  getTreeMenus() {
    const menus = [
      {fid: 11, link: "/starter", icon: "fa fa-circle-o text-red", name: 'Home', hasMenu:false},
      {fid: 12, link: "", icon: "fa fa-dashboard", name: 'Function#2', hasMenu: true, menus: [{mid: 121, link: '#', name: '获取远程数据列表'}, {mid: 122, link: '#', name: '基础数据类别'}, {mid: 123, link: '#', name: '类别详细页面'}]},
      {fid: 13, link: "", icon: "fa fa-files-o", name: 'Function#3', hasMenu: true, menus: [{mid: 131, link: '#', name: '获取远程数据列表'}, {mid: 132, link: '#', name: '基础数据类别'}, {mid: 133, link: '#', name: '类别详细页面'}]},
      {fid: 14, link: "", icon: "fa fa-pie-chart", name: 'Function#4', hasMenu: true, menus: [{mid: 141, link: '#', name: '获取远程数据列表'}, {mid: 142, link: '#', name: '基础数据类别'}, {mid: 143, link: '#', name: '类别详细页面'}]},
      {fid: 15, link: '/users', icon: "fa fa-users", name: 'User Management', hasMenu: true, menus: [{mid: 151, link: '/users', name: 'User List'}, {mid: 152, link: '#', name: '基础数据类别'}, {mid: 153, link: '#', name: '类别详细页面'}]},
      {fid: 16, link: '/jobs', icon: "fa fa-tasks", name: 'Schedulers', hasMenu: true, menus: [{mid: 161, link: '/jobs', name: 'Scheduler List'}, {mid: 162, link: '', name: '基础数据类别'}, {mid: 163, link: '#', name: '类别详细页面'}]}
    ];

    return menus;
  }

}
