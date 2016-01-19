/// <reference path="tsd/typings/knockout/knockout.d.ts" />

/**
 * BetterList
 */
class BetterList {
    constructor() {
        this.itemToAdd = ko.observable("");
        this.allItems = ko.observableArray(["リコッタチーズ", "エシャロット", "ロマネスコ", "オリーブオイル", "イタリアンパセリ", "パルミジャーノチーズ"]);
        this.selectedItems = ko.observableArray(["オリーブオイル"]);
    }
    public itemToAdd : KnockoutObservable<string>;
    public allItems : KnockoutObservableArray<string>;
    public selectedItems : KnockoutObservableArray<string>;
    
    /**
     * addItem
     */
    public addItem() : void {
       if ((this.itemToAdd() != "") && (this.allItems.indexOf(this.itemToAdd()) < 0)){
         this.allItems.push(this.itemToAdd());
       }
       
       this.itemToAdd("");
    }
    
    public removeSelected() : void {
        this.allItems.removeAll(this.selectedItems());
    }
    
    /**
     * sortItems
     */
    public sortItems() : void {
        this.allItems.sort();
    }
}

ko.applyBindings(new BetterList());