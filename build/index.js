// #!/usr/bin/env node

const { Input } = require('enquirer');
const fs = require('fs');

let getPrompt = function (name, message, validationFn) {

    return new Promise((resolve, reject) => {

        const prompt = new Input({
            name: name,
            message: message,
            validate: validationFn
        })

        resolve(prompt)

    })
}


let askQuestions = function (q) {

    return new Promise((resolve, reject) => {

        if (q) {

            getPrompt(q.name, q.message, q.validate).then((prompt) => {
                if (prompt) {
                    prompt.run().then((ans)=>{
                        if(ans){
                            resolve(ans)
                        }else{
                            reject('No Ans Received..')
                        }
                    })
                } else {
                    reject("No Prompt Received..")
                }
            }).catch(err => console.log(err))


        } else {
            reject("NO Q ...")
        }

    })
}

module.exports = {
    askQuestions: askQuestions
}