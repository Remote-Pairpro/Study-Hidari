/// <reference path="tsd/typings/knockout/knockout.d.ts" />

var PlanetsModel = function() {
    this.planets = ko.observableArray([
        { name: "水星", type: "rock"},
        { name: "金星", type: "rock"},
        { name: "地球", type: "rock"},
        { name: "火星", type: "rock"},
        { name: "木製", type: "gasgiant"},
        { name: "土星", type: "gasgiant"},
        { name: "天王星", type: "gasgiant"},
        { name: "海王星", type: "gasgiant"},
        { name: "冥王星", type: "rock"}
    ]);
 
    this.typeToShow = ko.observable("all");
    this.displayAdvancedOptions = ko.observable(false);
 
    this.addPlanet = function(type) {
        this.planets.push({
            name: "新惑星",
            type: type
        });
    };
 
    this.planetsToShow = ko.computed(function() {
        // 惑星のリストを 条件 "typeToShow" でフィルタリングします。
        var desiredType = this.typeToShow();
        if (desiredType == "all") return this.planets();
        return ko.utils.arrayFilter(this.planets(), function(planet) {
            return planet.type == desiredType;
        });
    }, this);
 
    // 惑星リスト用のアニメーション callback
    this.showPlanetElement = function(elem) { if (elem.nodeType === 1) $(elem).hide().slideDown() }
    this.hidePlanetElement = function(elem) { if (elem.nodeType === 1) $(elem).slideUp(function() { $(elem).remove(); }) }
};
 
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