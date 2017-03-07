/**
 * The controller doesn't do much more than setting the initial data model
 */

angular.module("demo")
    .controller("NestedListsDemoController", function($scope) {
        let list = [];
        let index;
        let value;
        let itemCopied;
        let listSelectItems = [];
        let saveDB = [];
        $scope.setItemWithKey = (item,$event) => {
            "use strict";
            let countExist = 1;
            if($event.shiftKey){
                    angular.forEach(listSelectItems,function(value,index){
                        if(value.id === item.id && value.type === item.type){
                            countExist = 0;
                            listSelectItems.splice(index,1);
                        }
                    });
                    if(countExist == 1){
                        listSelectItems.push(item);
                    }
            }
            if(!$event.shiftKey){
                listSelectItems = [];
            }
        };

        $scope.setValue = (listFromUI,indexFromUI,valueFromUI) => {
            "use strict";
            list = listFromUI;
            index = indexFromUI;
            value = valueFromUI;
        };
        let copyHtml = '<div class="text-info" style="cursor: pointer;margin-left: 5px;">' +
            '<h4><i class="fa fa-files-o" aria-hidden="true"></i> Copy</h4></div>';
        let copyItem = {
            html: copyHtml,
            enabled: function() {return true},
            click: function () {
                saveDB = angular.copy(listSelectItems)
            }
        };
        let pasteHtml = '<div class="text-success" style="cursor: pointer;margin-left: 5px;">' +
            '<h4><i class="fa fa fa-clipboard" aria-hidden="true"></i> Paste</h4></div>';
        let pasteItem = {
            html: pasteHtml,
            enabled: function() {return true},
            click: function () {
                if(saveDB.length > 0){
                    if (value.type === "container") {
                        angular.forEach(saveDB,function(valueArr){
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
        $scope.menuOptions = [
            copyItem,
            pasteItem,
            null,
            deleteItem,
        ];
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
