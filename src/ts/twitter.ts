/// <reference path="tsd/typings/knockout/knockout.d.ts" />
/// <reference path="tsd/typings/jquery/jquery.d.ts" />

// ViewModel は作業中のすべての状態を保持します。また、それらを編集できるようにする方法も持っており、
// さらに必要な状態を背後のデータから計算するために Computed Observable を使用しています。
// --
// View (= HTML UI) はこれらの状態を data-bind 属性を使ってバインドします。
// そのため常に ViewModel の最新の状態に保たれます。
// また、ViewModel は View にどのようにバインドされるかを意識せずに記述することができます。
//
var savedLists: [{name:string, userNames:string[]}] = [
    { name: "Celebrities", userNames: ['JohnCleese', 'MCHammer', 'StephenFry', 'algore', 'StevenSanderson']},
    { name: "Microsoft people", userNames: ['BillGates', 'shanselman', 'ScottGu']},
    { name: "Tech pundits", userNames: ['Scobleizer', 'LeoLaporte', 'techcrunch', 'BoingBoing', 'timoreilly', 'codinghorror']}
];

class TwitterListModel{
    public savedLists : KnockoutObservableArray<any>;
    public editingList : {name:KnockoutObservable<string>, userNames:KnockoutObservableArray<string>};
    public userNameToAdd : KnockoutObservable<string>;
    public currentTweets : KnockoutObservableArray<any>;
    public userNameToAddIsValid : KnockoutComputed<boolean>;
    public hasUnsavedChanges : KnockoutComputed<boolean>;
    public canAddUserName : KnockoutComputed<boolean>;
    
    constructor(list, selectedList:string){
        this.savedLists = ko.observableArray(list);
        this.editingList = {
            name: ko.observable(selectedList),
            userNames: ko.observableArray([])
        };
        this.userNameToAdd = ko.observable("");
        this.currentTweets = ko.observableArray([]);
        ko.computed(function() {
            // viewmodel.editingList.name() を監視する。
            // 変更があれば、savedList (=データ元) から一致するリスト名のユーザ名リストを取得し、
            // editingList.userNames にコピーする。
            var savedList = this.findSavedList(this.editingList.name());
            if (savedList) {
                var userNamesCopy = savedList.userNames.slice(0);
                this.editingList.userNames(userNamesCopy);
            } else {
                this.editingList.userNames([]);
            }
        }, this);
        
        this.hasUnsavedChanges = ko.computed(function() {
            if (!this.editingList.name()) {
                return this.editingList.userNames().length > 0;
            }
            var savedData = this.findSavedList(this.editingList.name()).userNames;
            var editingData = this.editingList.userNames();
            return savedData.join("|") != editingData.join("|");
        }, this);
        
        this.userNameToAddIsValid = ko.computed(function() {
            return (this.userNameToAdd() == "") || (this.userNameToAdd().match(/^\s*[a-zA-Z0-9_]{1,15}\s*$/) != null);
        }, this);
        
        this.canAddUserName = ko.computed(function() {
            return this.userNameToAddIsValid() && this.userNameToAdd() != "";
        }, this);
    
        // リスト内のユーザのツイートは、(非同期に) editingList.userNames から computed で自動取得する
        ko.computed(function() {
            twitterApi.getTweetsForUsers(this.editingList.userNames(), this.currentTweets);
        }, this);        
    }
    
    public findSavedList(name:string){
        var list = this.savedLists();
        return ko.utils.arrayFirst(list, function(list){
            return list.name === name;
        });
    }
    
    public addUser():void{
        if(this.userNameToAdd() && this.userNameToAddIsValid()){
            this.editingList.userNames.push(this.userNameToAdd());
            this.userNameToAdd("");
        }
    }
    
    public removeUser = (userName:string) => {this.editingList.userNames.remove(userName)};
    public saveChanges(){
        var saveAs = prompt("次の名前で保存: ", this.editingList.name());
        if(saveAs){
            var dataToSave = this.editingList.userNames().slice(0);
            var existingSavedList = this.findSavedList(saveAs);
            if(existingSavedList){
                existingSavedList.userNames = dataToSave;
            }else{
                this.savedLists.push({
                    name: saveAs,
                    userNames: dataToSave
                });
            }
            this.editingList.name(saveAs);
        }
    }
    
    public deleteList =　() => {
        var nameToDelete = this.editingList.name();
        var savedListsExceptOneToDelete = $.grep(this.savedLists(), function(list) {
            return list.name != nameToDelete
        });
        this.editingList.name(savedListsExceptOneToDelete.length == 0 ? null : savedListsExceptOneToDelete[0].name);
        this.savedLists(savedListsExceptOneToDelete);
    };
    
    
}

ko.applyBindings(new TwitterListModel(savedLists, "Tech pundits"));
 
// 「読込中」の表示は jQuery でおこなう。- Knockout では何もしない。
$(".loadingIndicator").ajaxStart(function() {
    $(this).fadeIn();
}).ajaxComplete(function() {
    $(this).fadeOut();
});