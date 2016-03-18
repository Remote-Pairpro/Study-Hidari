/// <reference path="../typings/main.d.ts" />

// ViewModel を定義します
class HelloWorldViewModel{
    public firstName:KnockoutObservable<string>;
    public lastName:KnockoutObservable<string>;
    public fullName:KnockoutComputed<string>;

    constructor(first, last) {
        this.firstName = ko.observable(first);
        this.lastName = ko.observable(last);
        this.fullName = ko.computed(() => this.firstName() + " " + this.lastName());
    }
}

// 次のコードで Knockout を起動します。
var helloWorldViewModel = new HelloWorldViewModel("Hidari", "Ikw");
ko.applyBindings(helloWorldViewModel);