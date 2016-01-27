/// <reference path="tsd/typings/knockout/knockout.d.ts" />
/// <reference path="tsd/typings/jquery/jquery.d.ts" />

var initialData = [
    { firstName: "ダニー", lastName: "ラルッソ", phones: [
            { type: "携帯", number: "(555) 121-2121" },
            { type: "電話", number: "(555) 123-4567"}]
    },
    { firstName: "先生", lastName: "宮城", phones: [
            { type: "携帯", number: "(555) 444-2222" },
            { type: "電話", number: "(555) 999-1212"}]
    }
];


/**
 * ContactsViewmodel
 */
class ContactsViewmodel {
    public contacts: KnockoutObservableArray<{firstName: any, lastName: any, phones: KnockoutObservableArray<{}>}>;
    public lastSavedJson: KnockoutObservable<string>;
    constructor(contacts) {
        this.contacts = ko.observableArray(ko.utils.arrayMap(contacts, function(contact:{firstName:string; lastName:string; phones:any}) {
            return { firstName: contact.firstName, lastName: contact.lastName, phones: ko.observableArray(contact.phones) };
        }));
        
        this.lastSavedJson = ko.observable("");
    }
    
    public addContact():void{
        this.contacts.push({
            firstName: "",
            lastName:"",
            phones: ko.observableArray()
        })
    }
    
    public removeContact = (contact) => {
        this.contacts.remove(contact);
    }
    
    public addPhone(contact):void{
        contact.phones.push({
            type: "",
            number: ""
        })
    }
    
    // アロー関数にするとthisが維持される
    public removePhone = (phone) => {
        $.each(this.contacts(), function() { this.phones.remove(phone) });
    }
    
    public save(){
        this.lastSavedJson(JSON.stringify(ko.toJS(this.contacts), null, 2));
    }
}

ko.applyBindings(new ContactsViewmodel(initialData));
