import { AllUsers } from './project.js'
import { PostQuestion } from './project.js'
import { PostUser } from './project.js'
import { AllQuestions } from './project.js'
import { AuthenticateUser } from './project.js'
import { GetSpecificQ } from './project.js'
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
    $("#logout").click(function (event) {
        logout();
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
    $(".form-box").empty();

    // passed in question id

    question.forEach(function (description) {
        var buttonHTML = "<a id=" + description.id + ">Reply</a>"
        console.log(description.user.username);
        $(".form-box").append("<li>" + "@" + description.user.username + " " + description.questionDescription + " " + buttonHTML + "</li>");


        //  document.getElementById("getspecificdetails").addEventListener("click", function(){
        //      console.log("it got here");
        //     (description.ID);
        //   });
        $("#" + description.id).click(function () {
            console.log(this);
            getSpecificDetails(this.id)
        })
    })


    //   "<button id=getspecificdetails" + "(" + description.id + ")>" + "</buttton>");
}

function getSpecificDetails(id) {
    gSQ(id);
    console.log(id);
}
function gSQ(id) {
    gsQ2(id).then(detailsucces, detailfailure)
}
function gsQ2(id) {
    var apicall = new GetSpecificQ();
    let promise = apicall.getSpecificQuestion(id);
    return promise;
}
function detailsucces(response) {
    console.log(response);
    window.location.href = "question.html";
    $('body').append("<li> +it worked  </li>");
}
function detailfailure(response) {
    alert(response)
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
    getQuestions();
}
function postFailure(response) {
    alert(response)
}
function logout() {
    console.log("it got here")
    localStorage.removeItem('jsonToken');
}

// this will be for loading the user page when a user first gets logged in.
// $('userhtml').ready(function(){

// })