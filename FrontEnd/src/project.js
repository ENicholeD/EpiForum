export class AuthenticateUser {
    apilogin(username,password) {
      return new Promise(function(resolve,reject){
        let request = new XMLHttpRequest();
        const url = `http://localhost:4000/users/authenticate`
        console.log(url)
        request.onreadystatechange = function(){
            console.log(this.status);
          if(this.readyState == 4 && this.status === 200){

            resolve(request.response);
          }
  }
        }
        var parameters = {
            "Username": username,
            "Password": password
        };
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json")
        request.send(JSON.stringify(parameters));
        console.log("successss in api call")
      })
    }

  export class AllQuestions{
    getquestions(jsonToken){
        console.log("it got here");
        return new Promise(function(resolve,reject){
            let request = new XMLHttpRequest();
            const url = `http://localhost:4000/api/questions`
            console.log(url);
            console.log(request);

                //    else {
                //       console.log("request");
                //     reject(Error(request.statusText));
                //   }
                  var headers = {
                      "Authorization": "Basic" + " " +  jsonToken
                  };
                request.open("GET", url, headers);
                request.setRequestHeader("Content-Type", "application/json")
                request.send(JSON.stringify(headers));
                console.log(JSON.stringify(headers));
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


  export class AllAnswers{
    getquestions(jsonToken){
        console.log("it got here");
        return new Promise(function(resolve,reject){
            let request = new XMLHttpRequest();
            const url = `http://localhost:4000/api/answers`
            console.log(url);
            console.log(request);

                //    else {
                //       console.log("request");
                //     reject(Error(request.statusText));
                //   }
                  var headers = {
                      "Authorization": "Basic" + " " +  jsonToken
                  };
                request.open("GET", url, headers);
                request.setRequestHeader("Content-Type", "application/json")
                request.send(JSON.stringify(headers));
                console.log(JSON.stringify(headers));
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
