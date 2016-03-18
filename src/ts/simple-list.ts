/// <reference path="../typings/main.d.ts" />

/**
 * SimpleList
 */
class SimpleList {
    constructor(data:string[]) {
        this.items = ko.observableArray(data);
        this.itemToAdd = ko.observable("");
    }
    public items : KnockoutObservableArray<string>;
    public itemToAdd :  KnockoutObservable<string>;
    
    /**
     * addItem
     */
    public addItem() {
        if (this.itemToAdd() != "") {
            this.items.push(this.itemToAdd());
            this.itemToAdd("");
        }
    }
}

var SimpleListModel = function(items) {
    this.items = ko.observableArray(items);
    this.itemToAdd = ko.observable("");
    this.addItem = function() {
        if (this.itemToAdd() != "") {
            // アイテムを追加します。
            // 追加先の items は observableArray なので、対応する UI が更新されます。
            this.items.push(this.itemToAdd());
            // itemToAdd は Observable であり、テキストボックスにバインドされているため、
            // 次のようにすることでテキストボックスをクリアできます。
            this.itemToAdd("");
        }
    }.bind(this);  // this が常にこの ViewModel を指すようにします
};

ko.applyBindings(new SimpleList(["Alpha", "Beta", "Gamma"]));