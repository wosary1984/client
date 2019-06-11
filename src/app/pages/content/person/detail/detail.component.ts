import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from "../../../../service/common/common.service";
import ActionPath from '../../../../common/constants/action.path';
declare var $: any;

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css'],
    providers: [CommonService]
} )
export class DetailComponent implements OnInit {

    portrait = false;
    action = '';
    comes = '';
    image_url;
    image_file;
    new_number = {
        number: '',
        valid: true
    };
    new_address = {
        country: '',
        state: '',
        city: '',
        postcode: 0,
        xcoordinate: 0,
        ycoordinate: 0,
        valid: true
    }

    person = {
        personid: '',
        identitycard: '',
        name: '',
        gender: '',
        birthdate: '',
        birthplace: '',
        portrait: '',
        phone: [],
        address: []
    };

    new_event = {
        year: '',
        date: function() {
            var date = new Date()
            var y = date.getFullYear();
            var m = date.getMonth() + 1 < 10 ? ( '0' + ( date.getMonth() + 1 ) ) : date.getMonth() + 1;
            var d = date.getDate() < 10 ? ( '0' + date.getDate() ) : date.getDate();
            return y + '-' + m + '-' + d;
        }(),
        title: '',
        content: ''
    }

    events = [
        //        {
        //            year: '2018',
        //            events: [
        //                {
        //                    id: 'e1',
        //                    date: '2018-1-1',
        //                    title: 'test',
        //                    content: 'xxxxx'
        //                },
        //                {
        //                    id: 'e2',
        //                    date: '2018-11-1',
        //                    title: 'test',
        //                    content: 'xxxxx'
        //                }
        //            ]
        //        },
        //        {
        //            year: '2017',
        //            events: [
        //                {
        //                    id: 'e3',
        //                    date: '2017-1-1',
        //                    title: 'test',
        //                    content: 'xxxxx'
        //                },
        //                {
        //                    id: 'e4',
        //                    date: '2017-2-1',
        //                    title: 'test',
        //                    content: 'xxxxx'
        //                }
        //            ]
        //        }
    ]

    constructor( private commonService: CommonService, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private router: Router ) {
        activatedRoute.queryParams.subscribe( queryParams => {
            this.action = queryParams.action;
            this.comes = queryParams.comes;
            this.person.personid = queryParams.personid;

            if ( this.action === 'create' ) {
                this.portrait = false;
            }
            else if ( this.action === 'edit' || this.action === 'view' ) {
                if ( this.person.personid != undefined && this.person.personid != '' ) {
                    this.getPerson( this.person.personid );
                }
            }
        } )

    }

    ngOnInit() {
        $.timeliner( {} );
    }
    onLoadImage() {
        // console.log( this.image_url );
        window.URL.revokeObjectURL( this.image_url );
    }

    onChangeSelectFile( event ) {
        this.image_file = event.currentTarget.files[0];

        var that = this;
        this.commonService.encodeImageAsBase64( this.image_file ).done( function( result ) {
            if ( result != undefined ) {
                that.person.portrait = result;

                //console.log( that.person.portrait );
            }
        } );

        //console.log( this.encodeImageAsBase64( this.image_file ) );
        //this.UserInfo[field] = file;
        // 必须 bypassSecurityTrustUrl 转换一下 url ，要不能angular会报，说url不安全错误。
        this.image_url = this.sanitizer.bypassSecurityTrustUrl( window.URL.createObjectURL( this.image_file ) );
        this.portrait = true;
    }

    onSave() {
        const data = {
            action: this.action,
            person: this.person,
            events: this.events
        }
        if ( this.action == 'create' ) {
            var person = this.createPerson( data ).then( back => {
                if ( back.code == 200 ) {
                    this.person = back.data;
                    $( '#idStatusModel' ).modal( 'show' )
                    this.action = 'view';
                    //this.navToViewMode( this.person.personid );
                }
            } );
        } else if ( this.action === 'edit' ) {
            var person = this.updatePerson( this.person.personid, data ).then( back => {
                this.person = back.data;
                $( '#idStatusModel' ).modal( 'show' )
                this.action = 'view';
                //this.navToViewMode( this.person.personid );
            } )
        }
    }

    navBack() {
        if ( this.comes ) {
            this.router.navigate( [this.comes] );
        }
    }

    navToViewMode( personid ) {
        this.router.navigate( ['/persons/detail'], {
            queryParams: {
                action: 'view',
                personid: personid,
                comes: this.comes
            }
        } );
    }

    onClose() {
        this.navBack();
    }

    onEdit() {
        this.action = 'edit';
    }
    onInvalid( data ) {
        if ( data ) {
            data.valid = false;
        }
    }
    onAddPhone() {
        if ( this.new_number.number !== undefined ) {
            var phone = {
                number: '',
                valid: true
            };
            phone.number = this.new_number.number;
            phone.valid = true;
            this.person.phone.push( phone );
            this.new_number.number = undefined;
        }
    }

    onAddAddress() {
        let a: string;
        a = JSON.stringify( this.new_address );
        console.log( a );
        if ( a !== '' ) {
            let address = {
                address: '',
                country: '',
                state: '',
                city: '',
                postcode: 0,
                xcoordinate: 0,
                ycoordinate: 0,
                valid: true
            }
            address.address = a;
            address.country = this.new_address.country
            address.state = this.new_address.state
            address.city = this.new_address.city
            address.postcode = this.new_address.postcode
            address.xcoordinate = this.new_address.xcoordinate
            address.ycoordinate = this.new_address.ycoordinate
            this.person.address.push( address );
        }
        //        a=a.concat(this.new_address.country,' ');
        //        a=a.concat(this.new_address.state,' ');
        //        a=a.concat(this.new_address.city,' ');
        //        a=a.concat(this.new_address.postcode,' ');
        //        a=a.concat(this.new_address.xcoordinate,' ');
        //        a=a.concat(this.new_address.ycoordinate,' ');

    }

    onAddNewEvent() {
        if ( this.new_event.date !== null ) {
            var d = new Date( this.new_event.date.replace( /-/g, "/" ) );
            this.new_event.year = d.getFullYear().toString();

            var exist = false;
            for ( let x in this.events ) {
                var year = this.events[x];
                if ( year.year === this.new_event.year ) {
                    var object = {
                        id: this.commonService.generateUUID('pe'),
                        date: this.new_event.date,
                        title: this.new_event.title,
                        content: this.new_event.content
                    };
                    year.events.push( object );
                    year.events.sort( function( x, y ) {
                        var dx = new Date( x.date.replace( /-/g, "/" ) );
                        var dy = new Date( y.date.replace( /-/g, "/" ) );

                        return ( dx <= dy ? 1 : -1 )
                    } );
                    exist = true;
                    break;
                }
            }
            if ( !exist ) {
                var newYear = {
                    year: this.new_event.year,
                    events: [{
                        id: this.commonService.generateUUID('pe'),
                        date: this.new_event.date,
                        title: this.new_event.title,
                        content: this.new_event.content
                    }]
                }
                this.events.push( newYear );
            }

            this.events.sort( function( x, y ) {
                return Number( y.year ) - Number( x.year );
            } )

            this.new_event.title = '';
            this.new_event.content = '';
        }
    }

    /**************************************************************************************************************/

    getPerson( personid ) {
        let actionUrl = ActionPath.person.get_create_edit_person + '/' + personid;
        var employee = this.commonService.getPerson( actionUrl ).then( back => {
            if ( back.code == 200 ) {
                this.person = back.data;
                this.initializeEventsModel( this.person );
                if ( this.person.portrait == '' || this.person.portrait == undefined ) {
                    this.portrait = false;
                }
                else {
                    this.portrait = true;
                }
            }
        } );
    }
    /**************************************************************************************************************/

    initializeEventsModel( person ) {
        this.events.splice( 0, this.events.length );
        for ( let x in person.events ) {
            var event = person.events[x];
            var d = new Date( event.eventdate.replace( /-/g, "/" ) );
            var year = d.getFullYear().toString();
            var exist = false;

            for ( let y in this.events ) {
                var tmp = this.events[y];
                if ( tmp.year === year ) {
                    var object = {
                        id: event.id,
                        date: event.eventdate,
                        title: event.title,
                        content: event.content
                    };
                    tmp.events.push( object );
                    tmp.events.sort( function( x, y ) {
                        var dx = new Date( x.date.replace( /-/g, "/" ) );
                        var dy = new Date( y.date.replace( /-/g, "/" ) );

                        return ( dx <= dy ? 1 : -1 )
                    } );
                    exist = true;
                    break;
                }
            }
            if ( !exist ) {
                var newYear = {
                    year: year,
                    events: [{
                        id: event.id,
                        date: event.eventdate,
                        title: event.title,
                        content: event.content
                    }]
                }
                this.events.push( newYear );
            }

            this.events.sort( function( x, y ) {
                return Number( y.year ) - Number( x.year );
            } )
        }

    }

    /**************************************************************************************************************/
    createPerson( data ): Promise<any> {
        let actionUrl = ActionPath.person.get_create_edit_person;
        return this.commonService.createPerson( actionUrl, data ).then( back => {
            if ( back.code == 200 ) {
                console.log( back.data );
            }
            return back;
        } );
    }
    /**************************************************************************************************************/
    updatePerson( personid, data ): Promise<any> {
        let actionUrl = ActionPath.person.get_create_edit_person + '/' + personid;
        return this.commonService.updatePerson( actionUrl, data ).then( back => {
            if ( back.code == 200 ) {
                console.log( back.data );
            }
            return back;
        } );
    }

}
