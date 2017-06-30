#!/usr/bin/env node

'use strict';
const _ = require('lowdown-rmatheney7');


const customers = require("./data/customers.json");


/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */
 
 // 1 //
 var genders = _.pluck(customers, 'gender');
 var males = _.filter(genders, function(e, i, c){return(e === "male")});
 var numOfMales = males.length;
 console.log("1. The Number of males: " + numOfMales);
 
 // 2 //
 var females = _.filter(genders, function(e, i, c){return(e === "female")});
 var numOffemales = females.length;
 console.log("2. The Number of females: " + numOffemales);

// 3 //
 var ages = _.pluck(customers, 'age');
 var oldestAge = _.reduce(ages,function(e, i) {return Math.max(e,i);});
 var oldestCustomer = [];
 _.each(customers, function(e, i, c){if(e.age === oldestAge){oldestCustomer.push(e.name)}});

 if(oldestCustomer.length === 1){
 console.log("3. The oldest costumer is " + oldestCustomer + " at the age of " + oldestAge + ".");
}else{
  oldestCustomer = oldestCustomer.slice(0,oldestCustomer.length-1).join(", ") + " and " + oldestCustomer.slice(oldestCustomer.length-1);
 console.log("3. The oldest costumers are " + oldestCustomer + " both are  " + oldestAge + " years old.");
}
// 4 //
var youngestAge = _.reduce(ages,function(e,i) {return Math.min(e,i);});
 var youngestCustomer = [];
 _.each(customers, function(e, i, c){if(e.age === youngestAge){youngestCustomer.push(e.name)}});
 if(youngestCustomer.length === 1){
 console.log("4. The youngest costumer is " + youngestCustomer + " at the age of " + youngestAge  + ".");
}else{
 youngestCustomer = youngestCustomer.slice(0,youngestCustomer.length-1).join(", ") + " and " + youngestCustomer.slice(youngestCustomer.length-1);
 console.log("4. The youngest costumers are " + youngestCustomer + " both are  " +youngestAge + " years old.");
}
// 5 //
var balances = _.pluck(customers, 'balance');
var allBalances = _.map(balances,function(e,i,c){var asNum= e.slice(1); asNum = asNum.split(","); return asNum.join('');});
allBalances = _.map(allBalances, function(e, i, c){return parseFloat(e); });
var balanceTotal = _.reduce(allBalances,function(a, b){return a + b;});
var avgBalance = Math.round(balanceTotal / customers.length * 100) / 100;
avgBalance = avgBalance.toLocaleString('en-US',{ style: 'currency', currency: 'USD', minimumFractionDigits:2 });
console.log("5. The avg Balance of all the customers is " + avgBalance + ".");

// 6 //
var names = _.pluck(customers, "name");
var letter = "D";
var startsWith = _.filter(names, function(e, i, c){return(e[0] === letter)});
console.log("6. " + startsWith.length + " customers have names that start with the letter " + letter + ".");


// 7 //
var friendGrp = _.pluck(customers, "friends");
var friendsNames = [];
_.each(friendGrp,function (e,i,c){friendsNames.push(_.pluck(e, "name"));});
friendsNames = _.reduce(friendsNames, function(a, b){return a.concat(b)});
friendsNames = _.unique(friendsNames);
friendsNames = _.reject(friendsNames, function(e, i, c){return _.contains(names, e);});
var friendsStartWith = _.filter(friendsNames, function(e, i, c){return(e[0] === letter)});
console.log("7. " + friendsStartWith.length + " Friends of customers have names that start with the letter " + letter + ".");


// 8 //
var friendsWith = _.map(customers,function(e,i,c){return [e.name, e.friends];});
var friend = "Olga Newton";
var mutual = [];
 _.map(friendsWith,function(e,i,c){var arr =_.pluck(e[1],'name');
 _.each(arr, function(e2,i,c){if(e2 === friend){mutual.push( e[0])}});});
if(mutual.length > 1){
    mutual = mutual.slice(0,mutual.length-1).join(", ") + " and " + mutual.slice(mutual.length-1);
    console.log("8. " + mutual + " are friends with " + friend + "." );
}else if(mutual.length === 1){
    mutual = mutual[0];
    console.log("8. " + mutual + " is friends with " + friend + ".");
}else{
    console.log("8. " + friend + " isn't friends with anyone.");
}


// 9 //
var tags = _.map(customers, function(e,i,c){return e.tags});
var alltags = _.reduce(tags,function(a,b){return a.concat(b)});
var commontags = {};
 _.each(alltags, function(e,i,c){if(commontags.hasOwnProperty(e)){ commontags[e] += 1}else{ commontags[e] = 1}});
var topTags = [];
var mostTags = _.reduce(commontags,function(a, b) {return Math.max(a, b);},0);


_.each(commontags, function(e,i,c){if(e >= mostTags){topTags.push(i)}});
 topTags = topTags.slice(0,topTags.length-1).join(", ") + " and " + topTags.slice(topTags.length-1);
console.log("9. The most common tags are " + topTags + " each occuring "+ mostTags +" times.");

// 10 //
var obj ={};
_.reduce(genders, function(a,b,c){if(obj.hasOwnProperty(a)){ obj[a] += 1}else{return  obj[a] = 1}},0);
console.log("10.", obj);


