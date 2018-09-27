import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrgService } from "../../../service/org/org.service";
import ActionPath from '../../../common/constants/action.path';
import { DomSanitizer } from "@angular/platform-browser";

declare var Treant: any;
declare var $: any;

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.css'],
    providers: [OrgService]
} )
export class OrganizationComponent implements OnInit {

    constructor( private orgService: OrgService, private sanitizer: DomSanitizer ) { }

    /**************************************************************************************************************/
    getTree(): Promise<any> {
        let actionUrl = ActionPath.org.get_all_company
        var that = this;
        return this.orgService.getCompanies( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                var tree = { children: [] };
                for ( let company of back.data ) {
                    var node = {
                        text: {
                            name: {
                                val: company.name,
                                href: '#',
                                target: '_self'
                            },
                            id: 'company:' + company.companyid,
                            //                                title: company.description,
                            contact: "Tel: 01 213 123 134"
                        },
                        image: '',
                        collapsed: true,
                        children: []
                    }
                    that.buildNodes( node.children, company.departments );
                    tree.children.push( node );
                }
                return tree;
            }

        } );
    }


    getImage( companyid ): Promise<any> {
        let actionUrl = ActionPath.org.company_logo + '/' + companyid
        var that = this;
        return this.orgService.getCompanyLogo( actionUrl ).then( back => {
            var imageUrl;
            if ( back.code == 200 ) {
                var blob = new Blob( [back.data], { type: 'image/jpg' } );
                imageUrl = that.sanitizer.bypassSecurityTrustUrl( window.URL.createObjectURL( blob ) );
            }
            return imageUrl;
        } );
    }

    buildNodes( parent, departments ) {
        for ( let department of departments ) {
            var subnode = {
                text: {
                    name: {
                        val: department.name,
                        href: '#',
                        target: '_self'
                    },
                    id: 'department:' + department.departmentid,
                    //title: department.description,
                    contact: "Tel: 01 213 123 134"
                },
                collapsed: true,
                children: []
            }
            parent.push( subnode );

            if ( department.departments ) {
                this.buildNodes( subnode.children, department.departments );
            }
        }

    }
    /**************************************************************************************************************/

    ngOnInit() {
        this.getTree().then( back => {
            var chart_config = {
                chart: {
                    container: "#collapsable-org",
                    rootOrientation: 'NORTH', // NORTH || EAST || WEST || SOUTH
                    scrollbar: "fancy",
                    hideRootNode: true,
                    callback: {
                        onTreeLoaded: function() {
                            var $oNodes = $( '.Treant .node' );
                            $oNodes.on( 'click', function( oEvent ) {
                                var $oNode = $( this );
                                var oMeta = $oNode.data( 'treenode' );
                                console.log( oMeta.text.id );
                            } );
                            //var $oImg = $('.Treant .node .img')
                        }
                    },
                    animateOnInit: false,
                    connectors: {
                        type: 'step'
                    },
                    node: {
                        collapsable: false
                    },
                    animation: {
                        nodeAnimation: "easeOutSine",
                        nodeSpeed: 700,
                        connectorsAnimation: "bounce",
                        connectorsSpeed: 700
                    }
                },
                //nodeStructure: this.tree_data
                nodeStructure: back
            };
            var my_chart = new Treant( chart_config, null, $ );
        } );
    }

    refresh() {

    }

}
