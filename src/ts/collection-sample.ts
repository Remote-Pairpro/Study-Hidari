/// <reference path="../../typings/main.d.ts" />

/**
 * PersonModel
 * 
 * 自分の名前と子を保持し、新たな子を追加するメソッドをもつ Person クラス。
 */
class PersonModel {
    constructor(name: string, children:string[]) {
        this.name = name;
        this.children = ko.observableArray(children);
    }
    
    public name: string;
    public children: KnockoutObservableArray<string>;
    
    /**
     * addChild
     */
    public addChild() {
        this.children.push("New Child");
    }
}

// 自分の名前と子を保持し、新たな子を追加するメソッドをもつ Person クラス
var Person = function(name, children) {
    this.name = name;
    this.children = ko.observableArray(children);
 
    this.addChild = function() {
        this.children.push("新しいお子様");
    }.bind(this);
}
 
// 汎化した UI の状態を保持するが、UI の実装に依存しない ViewModel
var viewModel = {
    people: [
        new Person("Annabelle", ["Arnie", "Anders", "Apple"]),
        new Person("Bertie", ["Boutros-Boutros", "Brianna", "Barbie", "Bee-bop"]),
        new Person("Charles", ["Cayenne", "Cleopatra"])
    ],
    showRenderTimes: ko.observable(false)
};
 
ko.applyBindings(viewModel);