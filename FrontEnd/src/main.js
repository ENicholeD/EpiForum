import { AllUsers, GetUserPage } from './project.js'
import { PostQuestion } from './project.js'
import { PostUser } from './project.js'
import { AllQuestions } from './project.js'
import { AuthenticateUser } from './project.js'
import { GetSpecificQ } from './project.js'
import { PostAnswer } from './project.js'
import { MeetUp } from './project.js'
import $ from 'jquery'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

// console.log(window.localStorage.getItem('jsonToken'));
// console.log(window.localStorage.getItem('specificQuestion'));
// console.log(window.localStorage.getItem('userPage'));

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


    $("#answerPost").submit(function (event) {
        event.preventDefault();
        if(window.localStorage.getItem('jsonToken') == null)
        {
            alert("you have to be logged in to do this.")
            window.location.href = "/login.html"
        }
        else{
            var answerDescription =$("#responseInput").val();
        postAnswer(answerDescription, window.localStorage.getItem('jsonToken'));
        }
        

    });

    $("#newUser").submit(function (event) {
        var naMe = $("#FirstName").val();
        var last = $("#LastName").val();
        var Uname = $("#Username").val();
        var passWord = $("#Password").val();
        postUser(naMe, last, Uname, passWord);
    })

    $("#loginForm").submit(function (event) {
        event.preventDefault();
        if(window.localStorage.getItem('userPage') != null)
        {
            alert("Youre already logged in!")
            window.location.href = "/user.html"
        }
        else{
            
            var username = $("#username").val();
            var password = $("#password").val();
            console.log(username);
            console.log(password);
            
            authenticate(username, password);
            
        }
    })
    
    $("#logout").click(function (event) {
        logout();
    })
    $("#userProfile").click(function(event){
        if(window.localStorage.getItem('userPage') == null){
            alert("you have to be logged in to go to this page")
            window.location.href = "/login.html"
        }
        else{
            window.location.href = "/user.html"
        }
        
    })

})

//API functions start here

//Login
function authenticate(username, password) {
    authenticate2nd(username, password).then(loginsucces, failurefunction)
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
    gSU();

}
// only failure function
function failurefunction(response) {
    alert(response);
}
// failure function for every failed apiresponse.

//Question
function getQuestions() {
    getquestionsapicall().then(getQuestionSuccess, failurefunction);

}

function getquestionsapicall() {
    var apicall = new AllQuestions();
    let promise = apicall.getAllQuestions();
    return promise;

}
function getQuestionSuccess(response) {
    const question = JSON.parse(response);
    $(".form-box").empty();
    // passed in question id

    question.forEach(function (description) {
        // var buttonHTML = "<a class=reply id=" + description.id + ">Reply</a>"
        $(".form-box").append("<p>" + "@" + description.user.username + "| " + "<a class=reply id=" + description.id + ">" + description.questionDescription + "</a>" + "</p><hr>");
        $("#" + description.id).click(function () {
            getSpecificDetails(this.id)

        })
    })

}

// get specific details about a question.
function getSpecificDetails(id) {
    gSQ(id);
}
// short for get specific question. 
function gSQ(id) {
    gsQ2(id).then(detailsuccess, failurefunction)
}
function gsQ2(id) {
    var apicall = new GetSpecificQ();
    let promise = apicall.getSpecificQuestion(id);
    return promise;
}

function detailsuccess(response) {
    window.localStorage.setItem("specificQuestion", response);
    window.location.href = "/question.html"
}

// end of get questions api call and response for specific details and getting all of them. we can also dry up the code in the api call.

//Answer

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
    apiCallPostUser(naMe, last, Uname, passWord).then(postedSuccess, failurefunction);
}
function apiCallPostUser(naMe, last, Uname, passWord) {
    var apicall = new PostUser();
    let promise = apicall.postUser(naMe, last, Uname, passWord);
    return promise;
}

function success(response) {
    const user = JSON.parse(response);
    console.log(user);
    $("body").append("<li>" + user[0].firstName + user[0].questions[0].questionDescription + "</li>");
}
// end of new users. we didnt even use this function because we decided not to display users.

// posting question. 
function postQuestion(questionDescription, jsonToken) {
    apiCallPostQuestion(questionDescription, jsonToken).then(postedSuccess, failurefunction);
}
function apiCallPostQuestion(questionDescription, jsonToken) {
    var apicall = new PostQuestion();
    let promise = apicall.postQuestion(questionDescription, jsonToken);
    return promise;
}
function postedSuccess(response) {
    getQuestions();
}
// end of post question.

function postAnswer(answerDescription, jsonToken) {
    apiCallPostAnswer(answerDescription, jsonToken).then(postedASuccess, failurefunction);
}
function apiCallPostAnswer(answerDescription, jsonToken) {
    var apicall = new PostAnswer();
    let promise = apicall.postAnswer(answerDescription, jsonToken);
    return promise;
}
function postedASuccess(response) {
    window.localStorage.getItem("specificQuestion");
    var answerResponse = JSON.parse(window.localStorage.getItem("specificQuestion"));
    getSpecificDetails(answerResponse.id);
}
function logout() {
    
    localStorage.removeItem('jsonToken');
    localStorage.removeItem('userPage');
//     location.reload();
}
function gSU() {

    gSUApiCall().then(gotuserpage, failurefunction)
}
function gSUApiCall() {
    var apicall = new GetUserPage();
    let promise = apicall.getSpecificUser(window.localStorage.getItem('jsonToken'));
    return promise;
}
function gotuserpage(response) {
    window.localStorage.setItem('userPage', response);
    window.location.href = "/user.html"

}
