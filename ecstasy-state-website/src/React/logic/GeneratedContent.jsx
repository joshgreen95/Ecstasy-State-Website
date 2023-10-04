import React from "react";

export default function GeneratedContent(props){
    function GenerateContent(content){
        let htmlStrings = [];

        for (let index in content){
            const childType = content[index]['type'];
            const childContent = content[index]['content'];

            let htmlString = `<${childType}> ${childContent} </${childType}>`;
            htmlStrings.push(htmlString);
        }

        const joinedStrings = htmlStrings.join('\n');

        return { __html: joinedStrings }
}

    return(
        <div className="generatedContentContainer"
            dangerouslySetInnerHTML={GenerateContent(props.content)}>
        </div>
    )
}