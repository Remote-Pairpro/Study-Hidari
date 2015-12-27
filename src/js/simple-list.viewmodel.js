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
 
ko.applyBindings(new SimpleListModel(["Alpha", "Beta", "Gamma"]));