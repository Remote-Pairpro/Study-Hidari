/// <reference path="tsd/typings/knockout/knockout.d.ts" />
/// <reference path="tsd/typings/jquery/jquery.d.ts" />


/**
 * GiftViewModel
 */
class GiftViewModel {
    constructor(gifts:any) {
        this.gifts = gifts
    }
    public gifts : KnockoutObservableArray<any>;
    
    public addGift():void{
        this.gifts.push({
            name: "",
            price:""
        });
    }
    
    public removeGift = (gift) => {
        this.gifts.remove(gift);
    }
    
    public save = (form) =>{
        alert("次のようにサーバに送信できます: " + ko.utils.stringifyJson(this.gifts));
    }
}
/*
var GiftModel = function(gifts) {
    var self = this;
    self.gifts = ko.observableArray(gifts);
 
    self.addGift = function() {
        self.gifts.push({
            name: "",
            price: ""
        });
    };
 
    self.removeGift = function(gift) {
        self.gifts.remove(gift);
    };
 
    self.save = function(form) {
        alert("次のようにサーバに送信できます: " + ko.utils.stringifyJson(self.gifts));
        // ここで通常のフォーム送信同様に送信する場合、次のように書いてください:
        // ko.utils.postJson($("form")[0], self.gifts);
    };
};
 */

var giftViewModel = new GiftViewModel([
    { name: "高帽子", price: "39.95"},
    { name: "長いクローク", price: "120.00"}
]);

ko.applyBindings(giftViewModel, document.getElementById('demo_1'));
 
// jQuery Validation を起動
$("form").validate({ submitHandler: giftViewModel.save });
