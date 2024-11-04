function Homework(isdone){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isdone) {
                resolve("Homework is done");
            }
            else{
                reject("Homework is not done");
            }
        }, 2000)
    })
}

Homework(true)
.then((message) => console.log(message))
.catch((error) =>  console.log(error));
