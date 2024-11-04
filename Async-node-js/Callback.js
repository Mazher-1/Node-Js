function bakecookies(callbacks){
    console.log("Baking cookies")
    setTimeout(() => {
        console.log('Cookies are ready')
        callbacks()
    },3000)
}


bakecookies(() => {
    console.log('Lets eats the ccookies')
})