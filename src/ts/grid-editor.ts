/// <reference path="tsd/typings/knockout/knockout.d.ts" />
/// <reference path="tsd/typings/jquery/jquery.d.ts" />

var GiftModel:any  = function(gifts) {
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
 
var viewModel:any = new GiftModel([
    { name: "高帽子", price: "39.95"},
    { name: "長いクローク", price: "120.00"}
]);

ko.applyBindings(viewModel, document.getElementById('demo_1'));
 
// jQuery Validation を起動
$("form").validate({ submitHandler: viewModel.save });
