// ViewModel を定義します
var ViewModel = function(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
      
    this.fullName = ko.computed(function() {
        // Knockout は依存を自動的にトラッキングします。
        // fullName の評価中に firstName と lastName を呼び出すため、
        // それぞれに依存していることが検知されます。
        return this.firstName() + " " + this.lastName();
    }, this);
};
 
// 次のコードで Knockout を起動します。
ko.applyBindings(new ViewModel("Planet", "Earth"));