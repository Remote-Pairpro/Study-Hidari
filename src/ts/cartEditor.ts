/// <reference path="tsd/typings/knockout/knockout.d.ts" />
/// <reference path="tsd/typings/jquery/jquery.d.ts" />

function formatCurrency(value) {
    return "$" + value.toFixed(2);
}
 
var CartLine = function() {
    var self = this;
    self.category = ko.observable();
    self.product = ko.observable();
    self.quantity = ko.observable(1);
    self.subtotal = ko.computed(function() {
        return self.product() ? self.product().price * parseInt("0" + self.quantity(), 10) : 0;
    });
 
    // カテゴリが変更された時に、製品の選択状態をリセットする
    self.category.subscribe(function() {
        self.product(undefined);
    });
};
 
var Cart = function() {
    // 買い物カゴ各行の情報を保持し、それらから合計金額を算出する
    var self = this;
    self.lines = ko.observableArray([new CartLine()]); // デフォルトで1行格納する
    self.grandTotal = ko.computed(function() {
        var total = 0;
        $.each(self.lines(), function() { total += this.subtotal() })
        return total;
    });
 
    // アクション
    self.addLine = function() { self.lines.push(new CartLine()) };
    self.removeLine = function(line) { self.lines.remove(line) };
    self.save = function() {
        var dataToSave = $.map(self.lines(), function(line) {
            return line.product() ? {
                productName: line.product().name,
                quantity: line.quantity()
            } : undefined
        });
        alert("次のようにサーバに送信できます: " + JSON.stringify(dataToSave));
    };
};
 
ko.applyBindings(new Cart());