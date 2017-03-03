/**
 * The controller doesn't do much more than setting the initial data model
 */
angular.module("demo").controller("NestedListsDemoController", function($scope) {

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

    $scope.$watch('models.dropzones', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

    $scope.printcom = function(element){
        var list = []
        // function loop(item){
        //     if(item.hasOwnProperty('id')){
        //         if(item.id == element.id && item.type == element.type){
        //             console.log(item)
        //             return false
        //         }else{
        //             if(Array.isArray(item.children)){
        //                 if(item.type == "container"){
        //                     list.push(item)
        //                 }
        //                 angular.forEach(item.children,function(value){
        //                     loop(value)
        //                 })
        //             }
        //         }
        //     }
        //     else{
        //             if(Array.isArray(item.children)){
        //                 if(item.type == "container"){
        //                     list.push(item)
        //                 }
        //                 angular.forEach(item.children,function(value){
        //                     loop(value)
        //                 })
        //             }   
        //     }

        // }
        // loop($scope.models.dropzones.A[0])
        // angular.forEach(list[list.length -1].children,function(value){

        // })
        console.log(element.$index)
    }
});
