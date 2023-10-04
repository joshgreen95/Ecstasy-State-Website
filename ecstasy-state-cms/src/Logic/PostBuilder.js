import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { db } from '../Firebase/Firebase.js';

class Post{
    constructor(){
        this.componentArray = [];
        this.post = {};
    }

    get postArray(){
        this.componentArray = [];
        
        for(let component in this.post){
            this.componentArray.push(this.post[component]);
        }

        return this.componentArray;
    }

    addPostComponent(type, content){
        const postIndexLength = Object.keys(this.post).length;
        let componentIndex = 0;
        
        if(postIndexLength === 0){
            componentIndex = 0
            console.log('initializing at 0 ');
        } else {
            componentIndex = postIndexLength;
            console.log(`Initializing at  ${componentIndex}`);
        }

        componentIndex = componentIndex.toString();
        const convertedType = type.toString();
        const convertedContent = content.toString();

        const postComponent = {
            'type': convertedType ,
            'content': convertedContent
        }

        this.post[componentIndex] = postComponent;
    }

    getJson(){
        return JSON.stringify(this.post);
    }

    async UploadToFirebase(){
        const jsonContent = this.getJson();

        try {
            const docRef = await addDoc(collection(db, "post"), {
                'post': jsonContent
            });

            console.log('Document written with ID', docRef);
            
        } catch(e){
            console.log('Error adding document :', e);
        }
    }
}

export { Post };