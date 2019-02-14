'use strict';

var app = angular.module('myApp.view1', ['ngRoute','ngStorage'])

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]);

app.controller('View1Ctrl', function ($scope,$localStorage,shopingItems) {

  $scope.grossTotal = 0;

  shopingItems.list(function (items) {
    $scope.shoping = items;
  });

  $scope.cartItem = [];


  $scope.findElement = function (item) {

    // if($scope.cartItem == {}){
    //   i = 0;
    // }

    var isTrue = false;

    angular.forEach($scope.cartItem, function (cItem) {

      if (item == cItem.name) {
        isTrue = true;
      }

    });
    return isTrue;
  };

  $scope.findShopingElement = function (item) {

    // if($scope.cartItem == {}){
    //   i = 0;
    // }

    var isSTrue = false;

    angular.forEach($scope.shoping, function (sItem) {

      if (item.name == sItem.name) {
        isSTrue = sItem.price;
      }

    });
    return isSTrue;
  };

  // use name instead of index

  // change naming convention for variables and add comments for each logic

  $scope.getTotal = function () {
    angular.forEach($scope.cartItem, function (item) {
      //var is not working
      $scope.total = 0;
      $scope.total += item.price;
    });
    $scope.grossTotal = $scope.total;
  };

  $scope.addToCart = function (item) {
    // $scope.displayAlert = true;
     $scope.showCart = true;

    // setTimeout(function () {
    //   $scope.displayAlert = false;
    //   $scope.$apply();
    // }, 3000);

    // var found = $scope.findElement(item.name);
    // if (found) {
    //   // $scope.cartItem[i].quantity += $scope.shoping[i].quantity;
    //   // $scope.cartItem[i].price = $scope.shoping[i].price * $scope.cartItem[i].quantity;

    //   alert("Item already in Cart..! Increase quantity in cart for more")
    //   // shopingItems.getCost(function($scope.cartItem[i],$scope.shoping[i]){
    //   //   $scope.cartItem[i].price = citem.cost;
    //   // });

    // } else {
    //   console.log("item pushed");
    //   $scope.cartItem.push(angular.copy(item));
    //   console.log("successfully");
    //   $scope.getTotal();
    // }

    
    $scope.cartItem = shopingItems.add(item);
    $localStorage.cart = $scope.cartItem;

  };



  $scope.decrease = function (i, item) {
    // if ($scope.cartItem[i].quantity > 1) {
    //   $scope.cartItem[i].quantity = $scope.cartItem[i].quantity - 1;
    //   $scope.cartItem[i].price = $scope.shoping[i].price * $scope.cartItem[i].quantity;
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
      var sprice = $scope.findShopingElement(item);
      item.price = sprice * item.quantity;
    }
    else {
      $scope.deleteItem(i);
    }
    // $scope.getTotal();
  };




  $scope.increase = function (item) {

    if (item.quantity < 3) {
      item.quantity = item.quantity + 1;
      var price = $scope.findShopingElement(item);
      item.price = price * item.quantity;
      // $scope.cartItem[i].price = $scope.shoping[i].price * $scope.cartItem[i].quantity;
      //  item.price = $scope.shoping[i].price * item.quantity;
    } else {
      alert("You have reached the maximum limit of items");
    }
    $scope.getTotal();
  };

  // $scope.grossTotal = 0;

  $scope.deleteItem = function (item) {
    $scope.cartItem.splice(item, 1);
    if ($scope.cartItem.length == 0) {
      $scope.grossTotal = 0;
    }
  };

  $scope.clearCart = function () {
    $scope.cartItem.length = 0;
    $scope.grossTotal = 0;
    // $scope.showCart = false;
  };

});



// app.factory("shopingItems", function ($http) {

//   function getData(callback) {
//     $http({
//       method: "GET",
//       url: "groceries.json",
//       cache: true
//     }).then(function (response) {
//       var list = response.data;
//       callback(list);
//     });
//   };

//   // app.directive('sitems', function () {
//   //   return {
//   //     scope: {
//   //       sitems: '='
//   //     }
//   //   };
//   // });


//   return {
//     list: getData
//     // getCost: function (citem, sitem) {
//     //   return cost = citem.quantity * sitem.price;
//     // }
//     // sobj : $scope.cartItem[{}]
//   };

// });


// window.setTimeout(function() {
//   $(".alert").fadeTo(500, 0).slideUp(500, function(){
//       $(this).remove(); 
//   });
// }, 2000);