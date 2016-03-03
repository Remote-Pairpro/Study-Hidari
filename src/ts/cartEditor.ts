/// <reference path="tsd/typings/knockout/knockout.d.ts" />
/// <reference path="tsd/typings/jquery/jquery.d.ts" />



function formatCurrency(value) {
    return "$" + value.toFixed(2);
}

class CartLine {
    public category:KnockoutObservable<any>;
    public product: KnockoutObservable<any>;
    public quantity: KnockoutObservable<any>;
    public subtotal: KnockoutObservable<any>;
    
    constructor(){
        this.category = ko.observable();
        this.product = ko.observable();
        this.quantity = ko.observable();
        this.subtotal = ko.computed(
            () => this.product() ? this.product().price * parseInt("0" + this.quantity(), 10) : 0
        )
        
        this.category.subscribe(
            () => this.product(undefined)
        )
    }
}

class Cart {
    public lines: KnockoutObservableArray<any>;
    public grandTotal: KnockoutComputed<any>;
    
    constructor(){
        this.lines = ko.observableArray([new CartLine()]);
        this.grandTotal = ko.computed(
            () => {
                var total:number = 0;
                this.lines().forEach((x:CartLine, i:number) => total += x.subtotal());
                return total;
            }
        );
    }
    
    public addLine() {
        this.lines.push(new CartLine());
    }
    
    public removeLine = (line) => {
        this.lines.remove(line);
    }
    
    public save(){
        var dataToSave:any = $.map(this.lines(), function(line:any):any{
            return line.product() ? {
                productName: line.product().name,
                quantity: line.quantity()
            } : undefined;
        });
        alert("次のようにサーバに送信できます: " + JSON.stringify(dataToSave));
    }
}

ko.applyBindings(new Cart());