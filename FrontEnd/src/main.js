import {AllUsers} from './project.js'
import {PostQuestion} from './project.js'
import{AllQuestions} from './project.js'
import $ from 'jquery'

$(document).ready(function() {
  getQuestions();
 
 


  // $("#tester").click(function(event) {
  //   event.preventDefault();
  //   GetUsers();
  // })
  // $("#questionPost").submit(function(event) {
  //   event.preventDefault();
  //   var questionDescription = $("#questionInput").val();
  //   PostQuestion(questionDescription);
  // })
})



//Back-End
//Question functions
function getQuestions(){
    test().then(getQuestionSuccess,getQuestionFailure);
    
}

function test(){
  var apicall = new AllQuestions();
  let promise = apicall.getAllQuestions();
  
  return promise;
  
}

function getQuestionSuccess(response) {
  console.log(JSON.parse(response))
  const question = JSON.parse(response);
  
  
 
  question.forEach(function(description){
     $(".form-box").append("<li>" + description.questionDescription + "</li>");   
  })


}

function getQuestionFailure(response) {
  alert(response)
}

//User functions


// function getUsers() {
//   getAllUsers().then(success, failure);
// }
//
// function getAllUsers() {
//   var apicall = new AllUsers();
//   let promise = apicall.getAllUsers();
//   return promise;
// }
//
//
// function success(response) {
//   const user = JSON.parse(response);
//   console.log(user);
//   $("body").append("<li>" + user[0].firstName + user[0].questions[0].questionDescription + "</li>");
//
//
// }
//
// function failure(response) {
//   alert(response)
// }



//post question functions
// function PostQuestion(questionDescription) {
//   apiCallPostQuestion(questionDescription).then(postedSuccess, postFailure);
// }
//
// function apiCallPostQuestion() {
//   var apicall = new PostQuestion();
//   let promise = apicall.postQuestion();
//   return promise;
// }
