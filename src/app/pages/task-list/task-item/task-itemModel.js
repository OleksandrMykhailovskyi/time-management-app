import firebase from '../../../firebase';
import '../../notification/notification-jquery'
import '../../popup/dataPicker/dataPicker'

export class TaskItemModel {
    //the format of data (model) is created here
    constructor(testArray){
        this.testArray=testArray;
    }
    registerObserver(...observers){
        this.observers.push(...observers);
    }
    notify(){
        this.observers.forEach(observer => observer.observe());
    }
    removeTask(cardID){
        const db = firebase.database();
        try{
            db.ref('tasks/'+cardID).remove();
            jQuery('#root1').notificationPlugin({
                type: 'success',
                message: 'Your task was successfully removed',
                icon: 'icon-tomato-success',
                time: 5000
            })
        }catch(e){
            jQuery('#root1').notificationPlugin({
                type: 'error',
                message: 'Unable to remove task. Try again later',
                icon: 'icon-tomato-error',
                time: 5000
            })
        }
    }

    fillInTask(taskID){
        let currentID = taskID;
        let arrayTasks = [];
        //downloading the task with the currentID from the DB and adding it to the array
        const db = firebase.database();
        db.ref('tasks/').on('value', function(snapshot){
            snapshot.forEach((childSnapshot)=>{
                let childDataKey = childSnapshot.key;
                if(childDataKey===currentID){
                    arrayTasks.push({
                        ...childSnapshot.val(),
                        fbID: childSnapshot.key,
                    });
                }
            })
        })
        //take all the inputs from the modal window
        const inputs = document.querySelectorAll('.items-form__value');
        const radioButtons  = document.querySelectorAll('.check__input, .check__input--estimation');
        const date = document.getElementById('datePick');
        try{
            date.value=arrayTasks[0].deadline;
            //adding the values from the text inputs to the objects
            for(let i=0;i<inputs.length;i++){
                if(inputs[i].name==='description'){
                    inputs[i].value=arrayTasks[0].description;
                }else if(inputs[i].name==='title'){
                    inputs[i].value=arrayTasks[0].title;
                }
            }
            //adding the values from the checked radiobutton inputs to the objects
            for(let i=0;i<radioButtons.length;i++){
                if(radioButtons[i].name==='category'&&radioButtons[i].value===arrayTasks[0].category){
                    radioButtons[i].checked=true;
                }else if(radioButtons[i].name==='estimation'&&radioButtons[i].value===arrayTasks[0].estimation){
                    radioButtons[i].checked=true;
                }else if(radioButtons[i].name==='priority'&&radioButtons[i].value===arrayTasks[0].priority){
                    radioButtons[i].checked=true;
                }
            }
        }
        catch(e){
            console.log(e)
        }
    }
    editTask(taskID){
        const db = firebase.database();
        //take all the inputs from the modal window
        const inputs = document.querySelectorAll('.items-form__value');
        const radioButtons  = document.querySelectorAll('.check__input, .check__input--estimation');
        //taking the datapicker element
        const date = document.getElementById('datePick');
        let values = {};
        //adding the values from the text inputs to the objects
        try{
            for(let i=0;i<inputs.length;i++){
                values[inputs[i].name]=inputs[i].value;
            }
            //adding the values from the checked radiobutton inputs to the objects
            for(let i=0;i<radioButtons.length;i++){
                if(radioButtons[i].checked){
                    values[radioButtons[i].name]=radioButtons[i].value;
                }
            }
        }
        catch(e){
            console.log(e)
        }
        //the function to find the current status of the task
        let arrayTasks = [];
        db.ref('tasks/').on('value', function (snapshot) {
            snapshot.forEach((childSnapshot) => {
                let childDataKey = childSnapshot.key;
                if (childDataKey === taskID) {
                    arrayTasks.push({
                        ...childSnapshot.val(),
                        fbID: childSnapshot.key,
                    });
                }
            })
        });
        values.deadline=date.value;
        values.status=arrayTasks[0].status;
        //adding generated id to the object that will be sent to the FB
        values.fbID=taskID;
        values.createDate = new Date();
        let updateData = (object) =>{
            try{
                db.ref('tasks/'+taskID).set(object);
                jQuery('#root1').notificationPlugin({
                    type: 'success',
                    message: 'Your task was successfully saved',
                    icon: 'icon-tomato-success',
                    time: 5000
                })
            }catch(e){
                jQuery('#root1').notificationPlugin({
                    type: 'error',
                    message: 'Unable to save your task. Try again later',
                    icon: 'icon-tomato-error',
                    time: 5000
                })
            }
        }
        updateData(values);
    }
    closePopUp(){
        const popupDOM = document.querySelector('#popup');
        popupDOM.innerHTML='';
    }
    downloadCard(taskID){
        let arrayTasks = [];
        //downloading the task with the currentID from the DB and adding it to the array
        const db = firebase.database();
        db.ref('tasks/').on('value', function(snapshot){
            snapshot.forEach((childSnapshot)=>{
                let childDataKey = childSnapshot.key;
                if(childDataKey===taskID){
                    arrayTasks.push({
                        ...childSnapshot.val(),
                        fbID: childSnapshot.key,
                    });
                }
            })
        });
        let tasksObj = arrayTasks[0];
        return tasksObj;
    }
    changeStatus(taskID, newStatus){
        const db = firebase.database();
        //downloading the cardObject from FB
        let tasksObj = this.downloadCard(taskID);
        tasksObj.status=newStatus;
        if(tasksObj.status==='Daily_List'){
            try{
                let updateData = (object) =>{
                    db.ref('tasks/'+taskID).set(object);
                }
                updateData(tasksObj);
                jQuery('#root1').notificationPlugin({
                    type: 'info',
                    message: 'Your task was moved to the daily task list!',
                    icon: 'icon-tomato-info',
                    time: 5000
                })
            }catch(e){
                jQuery('#root1').notificationPlugin({
                    type: 'error',
                    message: 'Unable to move to the daily task list. Try again later',
                    icon: 'icon-tomato-error',
                    time: 5000
                })
            }
        }else{
            let updateData = (object) =>{
                db.ref('tasks/'+taskID).set(object);
            }
            updateData(tasksObj);
        }
    }
    //adding the "not set status to all the pomodoros"
    statusNotSet(taskID){
        const db = firebase.database();
        //downloading the cardObject from FB
        let tasksObj = this.downloadCard(taskID);
        let iterations = [...new Array(+tasksObj.estimation)].map( iteration => 'not set');
        tasksObj.pomodoroStatuses=iterations;
        //adding generated id to the object that will be sent to the FB
        let updateData = (object) =>{
            db.ref('tasks/'+taskID).set(object);
        }
        updateData(tasksObj);
    }
}