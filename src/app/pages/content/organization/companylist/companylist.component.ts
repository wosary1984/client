import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { OrgService } from "../../../../service/org/org.service";
import ActionPath from '../../../../common/constants/action.path';
import { Router } from "@angular/router";

declare var $: any;

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'app-company',
    templateUrl: './companylist.component.html',
    styleUrls: ['./companylist.component.css'],
    providers: [OrgService]
} )
export class CompanylistComponent implements OnInit, AfterViewInit {

    selectedNode = {
        text: '',
        desc: '',
        type: '',
        id: ''
    };
    action = '';

    ngAfterViewInit(): void {

        // $( '#company-tree' ).treeview( { data: this.getTree() } );
        this.getTree();
    }

    constructor( private orgService: OrgService, private router: Router) { }

    getTree() {
        let actionUrl = ActionPath.org.company
        var that = this;
        this.orgService.getCompanies( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                var tree = [];
                for ( let company of back.data ) {
                    var node = {
                        text: company.name,
                        type: 'company',
                        id: company.companyid,
                        desc: company.description,
                        icon: 'fa fa-html5',
                        selectedIcon: 'fa fa-html5',
                        backColor: '#FFFFFF',
                        selectable: true,
                        showTags: true,
                        tags: ['company'],
                        nodes: []
                    }
                    that.buildNodes(node.nodes,company.departments);

                    tree.push( node );
                }
                $( '#company-tree' ).treeview( { data: tree } );
                $( '#company-tree' ).on( 'nodeSelected', function( event, data ) {
                    that.treeNodeSelected( event, data );
                } );
            }

        } );
    }

    buildNodes( parent, departments ) {
        for ( let department of departments ) {
            var subnode = {
                text: department.name,
                type: 'department',
                id: department.departmentid,
                desc: department.description,
                backColor: '#FFFFFF',
                selectable: true,
                showTags: true,
                tags: ['department'],
                nodes: []
            }
            parent.push(subnode);
            
            if(department.departments){
                this.buildNodes(subnode.nodes,department.departments);
            }
        }

    }


    treeNodeSelected( event, data ) {
        this.selectedNode = data;
        this.action = 'view';
    }

    ngOnInit() {

    }

    createCompany() {
        this.action = 'create';
        this.selectedNode.id = '';
        this.selectedNode.text = '';
        this.selectedNode.type = 'company';
        
        this.router.navigate( ['/org/company'], {
            queryParams: {
                action:'create',
                parentid:this.selectedNode.id,
                parentName:this.selectedNode.text,
                type:this.selectedNode.type,
                comes:'org/companylist'
            }
        } );
    }
    
    createDepartment(){
        this.router.navigate( ['/org/department'], {
            queryParams: {
                action:'create',
                parentid:this.selectedNode.id,
                parentName:this.selectedNode.text,
                type:this.selectedNode.type,
                comes:'org/companylist'
            }
        } );
    }
    
    onView(){
        if(this.selectedNode.type=='company'){
            this.router.navigate( ['/org/company'], {
                queryParams: {
                    action:'view',
                    parentid:this.selectedNode.id,
                    parentName:this.selectedNode.text,
                    type:this.selectedNode.type,
                    comes:'org/companylist'
                }
            } );
        }
    }

    onSubmit( value: any ) {
        if ( value.action == 'cancel' ) {
            this.action = '';
        } else if ( value.action == 'submit' ) {
            this.action = '';
            this.getTree();
        }
    }

    refresh() {
        this.getTree();
    }

}
