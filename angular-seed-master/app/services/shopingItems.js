var app = angular.module('shopingItems',[]);

app.factory("shopingItems", function ($http) {

    function getData(callback) {
      $http({
        method: "GET",
        url: "groceries.json",
        cache: true
      }).then(function (response) {
        var list = response.data;
        callback(list);
      });
    };
  
    // app.directive('sitems', function () {
    //   return {
    //     scope: {
    //       sitems: '='
    //     }
    //   };
    // });
  
  
    return {
      list: getData
      // getCost: function (citem, sitem) {
      //   return cost = citem.quantity * sitem.price;
      // }
      // sobj : $scope.cartItem[{}]
    };
  
  });