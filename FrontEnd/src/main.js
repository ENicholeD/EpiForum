import { AllUsers } from './project.js'
import { PostQuestion } from './project.js'
import { PostUser } from './project.js'


import $ from 'jquery'

$(document).ready(function () {
    $("#tester").click(function (event) {
        event.preventDefault();
        GetUsers();
    })
    $("#questionPost").submit(function (event) {
        event.preventDefault();
        var questionDescription = $("#questionInput").val();

        postQuestion(questionDescription);
    })
   
    $("#newUser").submit(function (event) {
        event.preventDefault();
        var naMe = $("#FirstName").val();
        var last = $("#LastName").val();
        var Uname = $("#Username").val();
        var passWord = $("#Password").val();

        postUser(naMe, last, Uname, passWord);
    })
})

//getting new User
function GetUsers() {
    getAllUsers().then(success, failure);
}
function getAllUsers() {
    var apicall = new AllUsers();
    let promise = apicall.getAllUsers();
    return promise;
}
//posting new user
function postUser(naMe, last, Uname, passWord) {
    apiCallPostUser(naMe, last, Uname, passWord).then(postedSuccess, postFailure);
}
function apiCallPostUser(naMe, last, Uname, passWord) {
    var apicall = new PostUser();
    let promise = apicall.postUser(naMe, last, Uname, passWord);
    return promise;
}
//posting on frontend
function success(response) {
    const user = JSON.parse(response);
    console.log(user);
    $("body").append("<li>" + user[0].firstName + user[0].questions[0].questionDescription + "</li>");


}
function failure(response) {
    alert(response)
}
function postQuestion(questionDescription) {
    apiCallPostQuestion(questionDescription).then(postedSuccess, postFailure);
}
function apiCallPostQuestion(questionDescription) {
    var apicall = new PostQuestion();
    let promise = apicall.postQuestion(questionDescription);
    return promise;
}
function postedSuccess(response) {
    console.log(response);
    // const postedQuestion = JSON.parse(response);
    $("body").append("<li>" + response[0].description);
}
function postFailure(response) {
    alert(response)
}