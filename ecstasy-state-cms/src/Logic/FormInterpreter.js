function InterpretForm(event, post){
    console.log("interpreting")
    const target = event.target;

    const formLength = event.target.length - 1;
    
    let x = 0;
    let y = 1;

    for(let i = 0; i < formLength /2; i++){
        const typeVal = target[x][target[x]['selectedIndex']]['text'];
        const contentVal = target[y]['value'];

        console.log(`Type: ${typeVal} content: ${contentVal}`);

        post.addPostComponent(typeVal, contentVal);
        console.log(post);

        x += 2;
        y += 2;
    }
}

export { InterpretForm };