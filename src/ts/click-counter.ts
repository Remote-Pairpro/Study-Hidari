/// <reference path="../../typings/main.d.ts" />
/**
 * ClickCounter
 */
class ClickCounter {
    constructor() {
        this.numberOfClicks = ko.observable(0);
        this.hasClickedTooManyTimes = ko.computed(function() {
            return this.numberOfClicks() >= 5;
        }, this);
     }
    public numberOfClicks : KnockoutObservable<number>;

    /**
     * registerClick
     */
    public registerClick():void{
        this.numberOfClicks(this.numberOfClicks()+1);
    }

    /**
     * resetClicks
     */
    public resetClicks() {
        this.numberOfClicks(0);
    }
    
    public hasClickedTooManyTimes : KnockoutComputed<any>;
}
// Knockout を起動します。
ko.applyBindings(new ClickCounter());