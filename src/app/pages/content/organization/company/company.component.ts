import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { OrgService } from "../../../../service/org/org.service";
import ActionPath from '../../../../common/constants/action.path';
import { Router, ActivatedRoute } from "@angular/router";

declare var $: any;

@Component( {
    selector: 'app-companydetail',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css'],
    providers: [OrgService]
} )
export class CompanyComponent implements OnInit {

    imageUrl: any;
    HeadPortrait = false;
    title = '';
    company_logo_file;
    comes = ''

    @Input() action: string;
    @Input() type: string;
    @Input() id: string;
    @Input() name: string;
    @Input() description: string;

    @Output() onSubmit: EventEmitter<any> = new EventEmitter();

    constructor( private orgService: OrgService, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private router: Router ) {
        activatedRoute.queryParams.subscribe( queryParams => {
            this.action = queryParams.action;
            this.id = queryParams.parentid;
            this.name = queryParams.parentName;
            this.type = queryParams.type;
            this.comes = queryParams.comes;
            
            if(this.action ==undefined){
                this.router.navigate( ['/'] );
            }
            
            if(this.id !=undefined && this.id !=''){
                let actionUrl = ActionPath.org.company_logo +'/'+this.id;
                var that = this;
                this.orgService.getCompanyLogo( actionUrl ).then( back => {
                    if ( back.code == 200 ) {
                        var blob = new Blob([back.data], {type: 'image/jpg'});
                        that.imageUrl = that.sanitizer.bypassSecurityTrustUrl( window.URL.createObjectURL( blob) );
                        that.HeadPortrait = true;
                    }
                    //return back;
                } );
            }

        } );
    }

    ngOnInit() {
    }
    /**************************************************************************************************************/
    onChangeSelectFile( event ) {
        this.company_logo_file = event.currentTarget.files[0];
        //this.UserInfo[field] = file;
        // 必须 bypassSecurityTrustUrl 转换一下 url ，要不能angular会报，说url不安全错误。
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl( window.URL.createObjectURL( this.company_logo_file ) );
        this.HeadPortrait = true;
        if(this.action =='view'){
            this.action = 'edit';
        }
    }
    
    onLoadImage(){
        console.log(this.imageUrl);
        window.URL.revokeObjectURL(this.imageUrl);
    }
    
    onValueChanged(){
        if(this.action =='view'){
            this.action = 'edit';
        }
    }

    onCancel() {
        this.navBack();
    }

    navBack() {
        if ( this.comes ) {
            this.router.navigate( [this.comes] );
        }
    }
    
    onSave() {
        const data = {
            action: this.action,
            type: this.type,
            name: this.name,
            description: this.description,
            id: this.id
        }
        
        if(this.action =='create'){
            var company = this.createCompany( data ).then( back => {
                if ( back.code == 200 ) {
                    if ( this.company_logo_file && back.data ) {
                        this.uploadLogo( this.company_logo_file, back.data.companyid ).then( back2 => {
                            if ( back2.code == 200 ) {
                                this.navBack();
                            }
                        } );
                    }
                    else {
                        this.navBack();
                    }

                }
            } );
        }else if(this.action =='edit'){
            var company = this.editCompany( data ).then( back => {
                if ( back.code == 200 ) {
                    if ( this.company_logo_file && back.data ) {
                        this.uploadLogo( this.company_logo_file, back.data.companyid ).then( back2 => {
                            if ( back2.code == 200 ) {
                                this.navBack();
                            }
                        } );
                    }
                    else {
                        this.navBack();
                    }

                }
            } );
        }
        
    }
    /**************************************************************************************************************/
    onClick( value: any ) {

        if ( value == 'submit' ) {
            const data = {
                action: this.action,
                type: this.type,
                name: this.name,
                description: this.description,
                id: this.id
            }
            var companyId = this.createCompany( data ).then( back => {
                if ( back ) {
                    this.uploadLogo( this.company_logo_file, back.companyid ).then( back2 => {

                    } );
                }
                else {
                    value = 'error';
                }
                // 传播事件   
                this.onSubmit.emit(
                    {
                        action: value
                    } );
            } );
        }
        if ( value == 'cancel' ) {
            // 传播事件   
            this.onSubmit.emit(
                {
                    action: value
                } );
        }
    }
    /**************************************************************************************************************/
    createCompany( data ): Promise<any> {
        let actionUrl = ActionPath.org.get_create_edit_company
        return this.orgService.createCompany( actionUrl, data ).then( back => {
            if ( back.code == 200 ) {
                console.log( back.data );
            }
            return back;
        } );
    }
    
    editCompany( data ): Promise<any> {
        let actionUrl = ActionPath.org.get_create_edit_company +'/' +this.id;
        return this.orgService.editCompany( actionUrl, data ).then( back => {
            if ( back.code == 200 ) {
                console.log( back.data );
            }
            return back;
        } );
    }

    uploadLogo( file, companyId ): Promise<any> {
        const formData: FormData = new FormData();
        formData.append( 'files', file );

        let actionUrl = ActionPath.org.company_logo + '/' + companyId;
        return this.orgService.uploadCompanyLogo( actionUrl, formData ).then( back => {
            if ( back.code == 200 ) {
                console.log( back.data );
            }
            return back;
        } );
    }
    /**************************************************************************************************************/
}
