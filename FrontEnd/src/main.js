import {AllUsers} from './project.js'
import {PostQuestion} from './project.js'
import $ from 'jquery'

$(document).ready(function()
{
    $("#tester").click(function(event)
    {
        event.preventDefault();
        GetUsers();
    })
    $("#questionPost").submit(function(event){
        event.preventDefault();
        var questionDescription = $("#questionInput").val();
        PostQuestion(questionDescription);
    })
})
function GetUsers()
{
    getAllUsers().then(success, failure);
}
function getAllUsers(){
    var apicall = new AllUsers();
    let promise = apicall.getAllUsers();
    return promise;
}
function success(response)
{
    const user = JSON.parse(response);
    console.log(user);
    $("body").append("<li>" + user[0].firstName + user[0].questions[0].questionDescription + "</li>");

    
}
function failure(response)
{
    alert(response)
}
function PostQuestion(questionDescription)
{
    apiCallPostQuestion(questionDescription).then(postedSuccess, postFailure);
}
function apiCallPostQuestion(){
    var apicall = new PostQuestion();
    let promise = apicall.postQuestion();
    return promise;
}