/**
 * The controller doesn't do much more than setting the initial data model
 */

angular.module("demo")
    .controller("NestedListsDemoController", function($scope) {
        let list = [];
        let index;
        let value;
        let listSelectItems = [];
        let saveDB = [];
        $scope.setItemWithKey = (itemFromUI,$event) => {
            "use strict";
            let countExist = 1;
            if($event.shiftKey){
                    _.each(listSelectItems,function(value,index){
                        if(value.$$hashKey === itemFromUI.$$hashKey){
                            countExist = 0;
                            listSelectItems[index] = null;
                        }
                    });
                    listSelectItems = _.compact(listSelectItems);
                    if(countExist == 1){
                        listSelectItems.push(itemFromUI);
                    }
            }
            if(!$event.shiftKey){
                listSelectItems = [];
            }
        };

        let copyHtml = '<div class="text-info" style="cursor: pointer;margin-left: 5px;">' +
            '<h4><i class="fa fa-files-o" aria-hidden="true"></i> Copy</h4></div>';
        let copyItem = {
            html: copyHtml,
            enabled: function() {return true},
            click: function () {
                let isCurrentItem = false;
                _.each(listSelectItems,function(item){
                    "use strict";
                    if(item.$$hashKey == value.$$hashKey){
                        isCurrentItem = true;
                    }
                });
                if(isCurrentItem){
                    saveDB = angular.copy(listSelectItems);
                    listSelectItems = [];
                }
                if(!isCurrentItem){
                    listSelectItems = [];
                    listSelectItems.push(value);
                    saveDB = angular.copy(listSelectItems);
                    listSelectItems = []
                }
            }
        };
        let pasteDisableHtml = '<div style="cursor: no-drop;margin-left: 5px;color: #777777">' +
            '<h4><i class="fa fa fa-clipboard" aria-hidden="true"></i> Paste</h4></div>';
        let pasteDisableItem = {
            html: pasteDisableHtml,
            enabled: function() {return true},
            click: function() { return false}
        };
        let pasteHtml = '<div class="text-success" style="cursor: pointer;margin-left: 5px;">' +
            '<h4><i class="fa fa fa-clipboard" aria-hidden="true"></i> Paste</h4></div>';
        let pasteItem = {
            html: pasteHtml,
            enabled: function() {return true},
            click: function () {
                if(saveDB.length > 0){
                    if (value.type === "container") {
                        _.each(saveDB,function(valueArr){
                            "use strict";
                            value.children[0].children.push(valueArr);
                        });
                    }
                    saveDB = [];
                    listSelectItems = [];
                }
            }
        };
        let deleteHtml = '<div class="text-danger" style="cursor: pointer;margin-left: 5px;">' +
            '<h4><i class="fa fa-minus-square" aria-hidden="true"></i> Delete</h4></div>';
        let deleteItem = {
            html: deleteHtml,
            enabled: function() {return true},
            click: function () {
                list.splice(index,1);
            }};
        $scope.menuOptions = function(listFromUI,indexFromUI,valueFromUI){
            list = listFromUI;
            index = indexFromUI;
            value = valueFromUI;
            if(saveDB.length > 0) {
                return [
                    copyItem,
                    pasteItem,
                    null,
                    deleteItem,
                ]
            }else{
                return [
                    copyItem,
                    pasteDisableItem,
                    null,
                    deleteItem,
                ]
            }
        };
    $scope.models = {
        selected: null,
        templates: [
            {type: "item", id: 2},
            {type: "container", id: 1, children: [
                    {
                        "children":[],
                    }
                ]
            }
        ],
        dropzones: {
            "A": []
        }
    };
    $scope.testMousever = (element,index) => console.log(index);
    $scope.$watch('models.dropzones', function(model) {

        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

});
