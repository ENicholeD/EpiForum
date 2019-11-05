// this isnt implemnted yet.
export class AuthenticateUser {
    apilogin(username,password) {
      return new Promise(function(resolve,reject){
        let request = new XMLHttpRequest();
        const url = `http://localhost:4000/user/authenticate`
        console.log(url)
        request.onreadystatechange = function(){
            console.log(this.status);
          if(this.readyState == 4 && this.status === 200){

            resolve(request.response);
          }
        }
        var parameters = {
            "Username": username,
            "Password": password
        };
        console.log(parameters);
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json")
        request.send(JSON.stringify(parameters));
        console.log("successss in api call")
      })
    }
  }
  // this gets all users , it has been tested
  export class AllUsers{
    getAllUsers(){
        return new Promise(function(resolve,reject){
            let request = new XMLHttpRequest();
            const url = `http://localhost:4000/users`
            console.log(url);
            console.log(request);

                //    else {
                //       console.log("request");
                //     reject(Error(request.statusText));
                //   }
                request.open("GET", url);
                request.setRequestHeader("Content-Type", "application/json")
                request.send()
                request.onreadystatechange = function(){
                    console.log(this.readyState);
                    if(this.readyState == 4 && this.status === 200){

                        resolve(request.response);
                      }

                console.log("success in call forrestaraunt");
            }
        })
    }
  }
  // this is getting all the questions, this still needs to be tested. 
  export class AllQuestions{
    getAllQuestions(){
        return new Promise(function(resolve,reject){
            let request = new XMLHttpRequest();
            const url = `http://localhost:4000/api/question`
            console.log(url);
            console.log(request);

                //    else {
                //       console.log("request");
                //     reject(Error(request.statusText));
                //   }
                request.open("GET", url);
                request.setRequestHeader("Content-Type", "application/json")
                request.send()
                request.onreadystatechange = function(){
                    console.log(this.readyState);
                    if(this.readyState == 4 && this.status === 200){

                        resolve(request.response);
                      }

                console.log("success in call forrestaraunt");
            }
        })
    }
  }
  // this is me getting started to right the post function for questions
  export class PostQuestion{
    postQuestion(questionDescription, jsonToken){
        return new Promise(function(resolve,reject){
            let request = new XMLHttpRequest();
            const url = `http://localhost:4000/api/question`
            console.log(url);
            console.log(request);

                //    else {
                //       console.log("request");
                //     reject(Error(request.statusText));
                //   }
                var parameters = {
                  "QuestionDescription": questionDescription
                };
                console.log(parameters);
                console.log(jsonToken);
                request.open("POST", url);
                request.setRequestHeader("Content-Type", "application/json")
                request.setRequestHeader("Authorization", "Bearer " + jsonToken)
                request.send(JSON.stringify(parameters))
                request.onreadystatechange = function(){
                    console.log(this.readyState);
                    if(this.readyState == 4 && this.status === 200){

                        resolve(request.response);
                      }

                console.log("success in call forrestaraunt");
            }
        })
    }
  }

  export class PostUser{
    postUser(naMe, last, Uname, passWord){
        return new Promise(function(resolve,reject){
            let request = new XMLHttpRequest();
            const url = `http://localhost:4000/user`
            console.log(url);
            console.log(request);

                //    else {
                //       console.log("request");
                //     reject(Error(request.statusText));
                //   }
                var parameters = {
                 "FirstName": naMe, 
                 "LastName" :last, 
                 "Username": Uname, 
                 "Password": passWord
                };
                console.log(parameters);
                request.open("POST", url);
                request.setRequestHeader("Content-Type", "application/json")
                request.send(JSON.stringify(parameters))
                request.onreadystatechange = function(){
                    console.log(this.readyState);
                    if(this.readyState == 4 && this.status === 200){

                        resolve(request.response);
                      }

                console.log("success in call forrestaraunt");
            }
        })
    }
  }
  export class GetSpecificQ{
    getSpecificQuestion(questionID){
      console.log("this is the question id from the api" + questionID);
        return new Promise(function(resolve,reject){
            let request = new XMLHttpRequest();
            const url = `http://localhost:4000/api/question/${questionID}`;
            console.log(url);
            console.log(request);

                //    else {
                //       console.log("request");
                //     reject(Error(request.statusText));
                //   }
                request.open("GET", url);
                request.setRequestHeader("Content-Type", "application/json")
                request.send()
                request.onreadystatechange = function(){
                    console.log(this.readyState);
                    if(this.readyState == 4 && this.status === 200){
                      // window.location.href = "question.html";
                        resolve(request.response);
                      }
                      
                console.log("success in call forrestaraunt");
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
  

  
