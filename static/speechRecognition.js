if("webkitSpeechRecognition" in window){
    let speechRecognition=new webkitSpeechRecognition();

    speechRecognition.continuous=true;
    speechRecognition.interimResults=true;
    speechRecognition.lang="en-US";

    let isListening=false;

    const toggleButton=document.querySelector("#toggleSpeech");
    const statusElement=document.querySelector("#status");
    const textInput=document.querySelector("#textInput");

    speechRecognition.onstart=()=>{
        statusElement.style.display="block";
        toggleButton.innerHTML = "";
        const ie1=document.createElement("img");
        ie1.src="static/images/micoff.png";
        ie1.style.width='15px';
        ie1.style.height='15px';
        toggleButton.appendChild(ie1);
        isListening=true;
    };

    speechRecognition.onerror=()=>{
        statusElement.style.display="none";
        console.log("Speech Recognition Error");
        toggleButton.innerHTML = "";
        const ie2=document.createElement("img");
        ie2.src="static/images/mic.png";
        ie2.style.width='15px';
        ie2.style.height='15px';
        toggleButton.appendChild(ie2);
        isListening=false;
    };

    speechRecognition.onend=()=>{
        statusElement.style.display="none";
        console.log("Speech Recognition Ended");
        toggleButton.innerHTML = "";
        const ie3=document.createElement("img");
        ie3.src="static/images/mic.png";
        ie3.style.width='15px';
        ie3.style.height='15px';
        toggleButton.appendChild(ie3);
        isListening=false;
    };

    speechRecognition.onresult=(event)=>{
        let final_transcript="";

        for(let i=event.resultIndex;i<event.results.length;++i){
            if(event.results[i].isFinal){
                final_transcript+=event.results[i][0].transcript;
            }
        }
    
        if(isListening){
            textInput.value=final_transcript;
        }
    };

    toggleButton.onclick=()=>{
        if(isListening){
            speechRecognition.stop();
        } 
        
        else{
            speechRecognition.start();
        }
    };
} 

else{
    console.log("Speech Recognition Not Available");
}