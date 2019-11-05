import { AllUsers } from './project.js'
import { PostQuestion } from './project.js'
import { PostUser } from './project.js'
import { AllQuestions } from './project.js'
import { AuthenticateUser } from './project.js'
import $ from 'jquery'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

console.log(window.localStorage.getItem('jsonToken'));

$(document).ready(function () {
    getQuestions();

    $("#tester").click(function (event) {
        event.preventDefault();
        GetUsers();
    })
    $("#questionPost").submit(function (event) {

        var questionDescription = $("#questionInput").val();

        postQuestion(questionDescription, window.localStorage.getItem('jsonToken'));
    });

    $("#newUser").submit(function (event) {
        var naMe = $("#FirstName").val();
        var last = $("#LastName").val();
        var Uname = $("#Username").val();
        var passWord = $("#Password").val();

        postUser(naMe, last, Uname, passWord);
    })
    $("#loginForm").submit(function (event) {
        var username = $("#username").val();
        var password = $("#password").val();
        console.log(username);
        console.log(password);
        authenticate(username, password);
    })
})
function authenticate(username, password) {
    authenticate2nd(username, password).then(loginsucces, loginfailure)
}
function authenticate2nd(username, password) {
    var apicall = new AuthenticateUser();
    var promise = apicall.apilogin(username, password);
    return promise;
}
function loginsucces(response) {

    var responsePare = JSON.parse(response);

    var jsonToken = responsePare.token;
    window.localStorage.setItem("jsonToken", responsePare.token);
    console.log(jsonToken)

}
function loginfailure(response) {
    alert(response);
}
function getQuestions() {
    test().then(getQuestionSuccess, getQuestionFailure);

}

function test() {
    var apicall = new AllQuestions();
    let promise = apicall.getAllQuestions();

    return promise;

}

function getQuestionSuccess(response) {
    console.log(JSON.parse(response));
    const question = JSON.parse(response);
    console.log(question[0].userID)



    question.forEach(function (description) {

        $(".form-box").append("<li>" + description.questionDescription + "</li>" + "<br>" + '<button>' + description.id + "</button>");

    })


}

function getQuestionFailure(response) {
    alert(response)
}
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
function postQuestion(questionDescription, jsonToken) {
    apiCallPostQuestion(questionDescription, jsonToken).then(postedSuccess, postFailure);
}
function apiCallPostQuestion(questionDescription, jsonToken) {
    var apicall = new PostQuestion();
    let promise = apicall.postQuestion(questionDescription, jsonToken);
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

