/// <reference path="../../typings/main.d.ts" />

class PlanetsModel {
    public planets: KnockoutObservableArray<{name:string, type:string}>;
    public typeToShow: KnockoutObservable<string>;
    public displayAdvancedOptions: KnockoutObservable<boolean>;
    public planetsToShow: KnockoutComputedStatic;
    public 
    constructor() {
        this.planets = ko.observableArray([
            { name: "水星", type: "rock"},
            { name: "金星", type: "rock"},
            { name: "地球", type: "rock"},
            { name: "火星", type: "rock"},
            { name: "木製", type: "gasgiant"},
            { name: "土星", type: "gasgiant"},
            { name: "天王星", type: "gasgiant"},
            { name: "海王星", type: "gasgiant"},
            { name: "冥王星", type: "rock"},
            { name: "Hidari", type: "gasgiant"}
        ]);
        
        this.typeToShow = ko.observable("all");
        this.displayAdvancedOptions = ko.observable(false);
        this.planetsToShow = ko.computed(function() {
            // 惑星のリストを 条件 "typeToShow" でフィルタリングします。
            var desiredType = this.typeToShow();
            if (desiredType == "all") return this.planets();
            return ko.utils.arrayFilter(this.planets(), function(planet:any) {
                return planet.type == desiredType;
            });
        }, this);
    }

    public addPlanet(type: string):void {
        this.planets.push({
            name: "新惑星",
            type: type
        })
    }

    // 惑星リスト用のアニメーション callback
    // TypeScriptっぽくない…
    public showPlanetElement = function(elem) { 
        if (elem.nodeType === 1){
             $(elem).hide().slideDown();
        }
    }
    
    public hidePlanetElement = function(elem) { 
        if (elem.nodeType === 1){
            $(elem).slideUp(function() { 
                $(elem).remove(); 
            });
        } 
    }
}

// ここもTypeScriptっぽくない＞＜
// jQuery の fadeIn() / fadeout() メソッドを使ってエレメントの 可視/不可視 を切り替えるカスタムばインディング
// 別のJSファイルに分割して読み込むこともできます。
ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        // 最初に、値に応じて即座にエレメントの 可視/不可視 を設定します。
        var value = valueAccessor();
        // Observable かどうかがわからない値は、"unwrapObservable" を使って処理することができます。
        $(element).toggle(ko.utils.unwrapObservable(value));
    },
    update: function(element, valueAccessor) {
        // 値の変化に応じて、ゆっくりと 可視/不可視 の切り替えを行います。
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
};
 
ko.applyBindings(new PlanetsModel());