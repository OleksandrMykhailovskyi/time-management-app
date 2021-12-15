import firebase from '../../firebase';
import '../notification/notification-jquery'

export class SettingsModel {
    //the format of data (model) is created here
    constructor(){
    }
    //these 2 methods are created for the EventBus to work. registerObserver helps to add the event observers to the EventBus repo.
    registerObserver(...observers){
        this.observers.push(...observers);
    }
    notify(){
        this.observers.forEach(observer => observer.observe());
    }
    plusHandler = (targetElement) =>{
        let inputValue=Number(targetElement.previousElementSibling.value);
        inputValue+= +targetElement.previousElementSibling.step;
        if(inputValue <= Number(targetElement.previousElementSibling.max)){
            targetElement.previousElementSibling.value = inputValue;
        }else{
            inputValue -= +targetElement.previousElementSibling.step;
        }
    }
    minusHandler = (targetElement) =>{
        let inputValue=Number(targetElement.nextElementSibling.value);
        inputValue-= +targetElement.nextElementSibling.step;
        if(inputValue >= Number(targetElement.nextElementSibling.min)){
            targetElement.nextElementSibling.value = inputValue;
        }else{
            inputValue += targetElement.nextElementSibling.step;
        }
    }
    //reading the array of current values from FB
    receiveData = async() =>{
        //initializing the db creating
        const db = firebase.database();
        const firebaseRef = db.ref('scores');
        let data
        await firebaseRef.once("value", function(snapshot){
            data = snapshot.val();        
        });
        //returning the object with data from FB
        return data;
    }
    //the function that fills in the inputs when the page reloads
    fillInSettingsInputs = () =>{
        this.receiveData().then(newValuesObj => {
            let inputs = document.querySelectorAll('.setting-type__amount');
            for(let i in newValuesObj){
                if(i==='workTime'){
                    inputs[0].value=newValuesObj[i];
                }else if(i==='workIterations'){
                    inputs[1].value=newValuesObj[i];
                }else if(i==='shortBreak'){
                    inputs[2].value=newValuesObj[i];
                }else if(i==='longBreak'){
                    inputs[3].value=newValuesObj[i];
                }
            }
            this.createCycle();
        })
    }
    //gettings value from the inputs
    getInputValues = () =>{
        let inputs = document.querySelectorAll('.setting-type__amount');
        let workTime = 0;
        let workIterations = 0;
        let shortBreak = 0;
        let longBreak = 0;
        let valueArr = [];
        //the iteration inside the array of inputs to receive the values
        for (let i = 0; i < inputs.length; i++) {
            if(inputs[i].id==='work-time'){
                workTime = +inputs[i].value;
            }else if(inputs[i].id==='work-iteration'){
                workIterations = +inputs[i].value;
            }else if(inputs[i].id==='short-break'){
                shortBreak = +inputs[i].value;
            }else{
                longBreak = +inputs[i].value;
            }
        }
        //adding the values to the array
        valueArr.push(workTime, workIterations, shortBreak, longBreak);
        return(valueArr);
    }
    //this function creates the objects and activates updateData function that sends the data to FB
    sendDataToFB = () => {
        let valueArr = this.getInputValues();
        let valueObj = {
            workTime: valueArr[0],
            workIterations: valueArr[1],
            shortBreak: valueArr[2],
            longBreak: valueArr[3],
        }
        //sending the data to the DB
        this.updateData(valueObj);
        console.log('the data is sent to the Firebase');
    }
    //this function sends the data to the FireBase
    updateData = (obj) =>{
        const db = firebase.database();
        db.ref('scores').set(obj);
        try{
            jQuery('#root1').notificationPlugin({
                type: 'success',
                message: 'Settings were successfully saved',
                icon: 'icon-tomato-success',
                time: 5000
            })
        } catch(e){
            jQuery('#root1').notificationPlugin({
                type: 'error',
                message: 'Unable to save settings. Try again later',
                icon: 'icon-tomato-error',
                time: 5000
            })
        }
    }
    //function that creates the chart
    createCycle = () => {
        //receiving chart DOM element
        let cycleWrapper = document.querySelector('.cycle__image');
        //in case there is some cycle already created, it should be removed
        while (cycleWrapper.firstChild) {
            cycleWrapper.removeChild(cycleWrapper.firstChild);
        }
        //receiving the array of input values via getInputValues() function
        let newArr = this.getInputValues();
        //these are the variables that contain the width of each div that is the part of the whole chart
        let timeLine = 2*((newArr[0] +newArr[2])*newArr[1] + newArr[3]);
        let workTimeWidth = (100*newArr[0])/timeLine;
        let shortBreakWidth = (100*newArr[2])/timeLine;
        let longBreakWidth = (100*newArr[3])/timeLine;
        //creating the line(there are 2 cycles by default)
        for(let i=0;i<2;i++){
            for(let i=0;i<newArr[1];i++){
                //creating work itterations
                let workTime = document.createElement('div');
                let shortBreak = document.createElement('div');
                workTime.style.backgroundColor='#FFB200';
                workTime.style.width=`${workTimeWidth}%`;
                workTime.style.height = '20px';
                shortBreak.style.backgroundColor='#59ABE3';
                shortBreak.style.width=`${shortBreakWidth}%`;
                shortBreak.style.height = '20px';
                cycleWrapper.appendChild(workTime);
                cycleWrapper.appendChild(shortBreak);
            }
            //creating the long-break at the end of each itteration
            let longBreak = document.createElement('div');
            longBreak.style.backgroundColor='#B470D0';
            longBreak.style.width=`${longBreakWidth}%`;
            longBreak.style.height = '20px';
            cycleWrapper.appendChild(longBreak);
        }
        //the function that creates the line with the whole 
        let timeLineUp = () =>{
            let cycleHourTime = (newArr[0] +newArr[2])*newArr[1] + newArr[3];
            let timeEnd = document.querySelector('.time-top-end');
            let timeCycleEnd = document.querySelector('.time-top-center');
            let timeCycleBeginning = document.querySelector('.time-top-null');
            let hourForEnd = parseInt(timeLine/60);
            let minutesForEnd = timeLine%60;
            let hourForCenter = parseInt(cycleHourTime/60);
            let minutesForCenter = cycleHourTime%60;
            timeEnd.textContent = `${hourForEnd}h ${minutesForEnd}m`;
            timeCycleEnd.textContent = `First cycle: ${hourForCenter}h ${minutesForCenter}m`;
            timeCycleBeginning.textContent = '0h';
        }
        timeLineUp();
    }
    //to default values function
    toDefault = () => {
        let defaultValues = [25,5,5,30];
        document.querySelector('#work-time').value=defaultValues[0];
        document.querySelector('#work-iteration').value=defaultValues[1];
        document.querySelector('#short-break').value=defaultValues[2];
        document.querySelector('#long-break').value=defaultValues[3];
    }
}