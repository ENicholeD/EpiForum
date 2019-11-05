// this isnt implemnted yet.
export class AuthenticateUser {
  apilogin(username, password) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://localhost:4000/user/authenticate`

      request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {

          resolve(request.response);
        }
      }
      var parameters = {
        "Username": username,
        "Password": password
      };

      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json")
      request.send(JSON.stringify(parameters));

    })
  }
}
// this gets all users , it has been tested
export class AllUsers {
  getAllUsers() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://localhost:4000/users`

      request.open("GET", url);
      request.setRequestHeader("Content-Type", "application/json")
      request.send()
      request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {

          resolve(request.response);
        }
      }
    })
  }
}
// this is getting all the questions, this still needs to be tested. 
export class AllQuestions {
  getAllQuestions() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://localhost:4000/api/question`

      request.open("GET", url);
      request.setRequestHeader("Content-Type", "application/json")
      request.send()
      request.onreadystatechange = function () {

        if (this.readyState == 4 && this.status === 200) {

          resolve(request.response);
        }
      }
    })
  }
}
// this is me getting started to right the post function for questions
export class PostQuestion {
  postQuestion(questionDescription, jsonToken) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://localhost:4000/api/question`

      var parameters = {
        "QuestionDescription": questionDescription
      };
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json")
      request.setRequestHeader("Authorization", "Bearer " + jsonToken)
      request.send(JSON.stringify(parameters))
      request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {

          resolve(request.response);
        }
      }
    })
  }
}

export class PostUser {
  postUser(naMe, last, Uname, passWord) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://localhost:4000/user`

      var parameters = {
        "FirstName": naMe,
        "LastName": last,
        "Username": Uname,
        "Password": passWord
      };
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json")
      request.send(JSON.stringify(parameters))
      request.onreadystatechange = function () {

        if (this.readyState == 4 && this.status === 200) {

          resolve(request.response);
        }
      }
    })
  }
}
export class GetSpecificQ {
  getSpecificQuestion(questionID) {
    console.log("this is the question id from the api" + questionID);
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://localhost:4000/api/question/${questionID}`;

      request.open("GET", url);
      request.setRequestHeader("Content-Type", "application/json")
      request.send()
      request.onreadystatechange = function () {
        console.log(this.readyState);
        if (this.readyState == 4 && this.status === 200) {

          resolve(request.response);
        }
      }
    })
  }
}
  // export class PostAnswer{
  //   postAnswer(questionDescription, jsonToken){
  //       return new Promise(function(resolve,reject){
  //           let request = new XMLHttpRequest();
  //           const url = `http://localhost:4000/api/question`
  //           console.log(url);
  //           console.log(request);

  //               //    else {
  //               //       console.log("request");
  //               //     reject(Error(request.statusText));
  //               //   }
  //               var parameters = {
  //                 "QuestionDescription": questionDescription
  //               };
  //               console.log(parameters);
  //               console.log(jsonToken);
  //               request.open("POST", url);
  //               request.setRequestHeader("Content-Type", "application/json")
  //               request.setRequestHeader("Authorization", "Bearer " + jsonToken)
  //               request.send(JSON.stringify(parameters))
  //               request.onreadystatechange = function(){
  //                   console.log(this.readyState);
  //                   if(this.readyState == 4 && this.status === 200){

  //                       resolve(request.response);
  //                     }

  //               console.log("success in call forrestaraunt");
  //           }
  //       })
  //   }
  // }



