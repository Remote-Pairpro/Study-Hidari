/// <reference path="tsd/typings/knockout/knockout.d.ts" />
// ViewModel を定義します
var MyViewModel = (function () {
    function MyViewModel(first, last) {
        var _this = this;
        this.firstName = ko.observable(first);
        this.lastName = ko.observable(last);
        this.fullName = ko.computed(function () { return _this.firstName() + " " + _this.lastName(); });
    }
    return MyViewModel;
})();
// 次のコードで Knockout を起動します。
var viewModel = new MyViewModel("Hidari", "Ikw");
ko.applyBindings(viewModel);
