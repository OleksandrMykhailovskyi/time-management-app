import firebase from '../../../firebase';
import {TaskItemController} from '../task-item/task-itemController';

export class GlobalListModel {
    //the format of data (model) is created here
    constructor({}){
    }
    registerObserver(...observers){
        this.observers.push(...observers);
    }
    notify(){
        this.observers.forEach(observer => observer.observe());
    }
    //the method for the cards downloading
    downloadCards(){
        const taskItemDomWork = document.querySelector('.section-category-work--tasks');
        const taskItemDomEducation = document.querySelector('.section-category-education--tasks');
        const taskItemDomSport = document.querySelector('.section-category-sport--tasks');
        const taskItemDomHobby = document.querySelector('.section-category-hobby--tasks');
        const taskItemDomOther = document.querySelector('.section-category-other--tasks');
        let ref = firebase.database().ref("tasks");
        ref.on("value", function(snapshot) {
            let tasksWorkArray=[];
            let tasksEducationArray=[];
            let tasksSportArray=[];
            let tasksHobbyArray=[];
            let tasksOtherArray=[];
            snapshot.forEach(function(childSnapshot) {
                let childData = childSnapshot.val();
                if(childData.status==='Global_List'){
                    if(childData.category==='work'){
                        tasksWorkArray.push({
                            ...childSnapshot.val(),
                            fbID: childSnapshot.key
                        });
                        let tasks = new TaskItemController(taskItemDomWork, tasksWorkArray);
                        tasks.init();
                    }else if(childData.category==='education'){
                        tasksEducationArray.push({
                            ...childSnapshot.val(),
                            fbID: childSnapshot.key
                        });
                        let tasks = new TaskItemController(taskItemDomEducation, tasksEducationArray);
                        tasks.init();
                    }
                    else if(childData.category==='sport'){
                        tasksSportArray.push({
                            ...childSnapshot.val(),
                            fbID: childSnapshot.key
                        });
                        let tasks = new TaskItemController(taskItemDomSport, tasksSportArray);
                        tasks.init();
                    }
                    else if(childData.category==='hobby'){
                        tasksHobbyArray.push({
                            ...childSnapshot.val(),
                            fbID: childSnapshot.key
                        });
                        let tasks = new TaskItemController(taskItemDomHobby, tasksHobbyArray);
                        tasks.init();
                    }
                    else if(childData.category==='other'){
                        tasksOtherArray.push({
                            ...childSnapshot.val(),
                            fbID: childSnapshot.key
                        });
                        let tasks = new TaskItemController(taskItemDomOther, tasksOtherArray);
                        tasks.init();
                    }
                }
            })
        })
    }
    //the method for the filter
    downloadCardsFilter(cardPriority){
        const taskItemDomWork = document.querySelector('.section-category-work--tasks');
        const taskItemDomEducation = document.querySelector('.section-category-education--tasks');
        const taskItemDomSport = document.querySelector('.section-category-sport--tasks');
        const taskItemDomHobby = document.querySelector('.section-category-hobby--tasks');
        const taskItemDomOther = document.querySelector('.section-category-other--tasks');
        let ref = firebase.database().ref("tasks");
        ref.on("value", function(snapshot) {
            let tasksWorkArray=[];
            let tasksEducationArray=[];
            let tasksSportArray=[];
            let tasksHobbyArray=[];
            let tasksOtherArray=[];
            snapshot.forEach(function(childSnapshot) {
                let childData = childSnapshot.val();
                if(childData.category==='work'&&childData.status==="Global_List"){
                    if(childData.priority===cardPriority){
                        tasksWorkArray.push({
                            ...childSnapshot.val(),
                            fbID: childSnapshot.key
                        });
                    }
                    let tasks = new TaskItemController(taskItemDomWork, tasksWorkArray);
                    tasks.init();
                }else if(childData.category==='education'&&childData.status==="Global_List"){
                    if(childData.priority===cardPriority){
                        tasksEducationArray.push({
                            ...childSnapshot.val(),
                            fbID: childSnapshot.key
                        });
                    }
                    let tasks = new TaskItemController(taskItemDomEducation, tasksEducationArray);
                    tasks.init();
                }
                else if(childData.category==='sport'&&childData.status==="Global_List"){
                    if(childData.priority===cardPriority){
                        tasksSportArray.push({
                            ...childSnapshot.val(),
                            fbID: childSnapshot.key
                        });
                    }
                    let tasks = new TaskItemController(taskItemDomSport, tasksSportArray);
                    tasks.init();
                }
                else if(childData.category==='hobby'&&childData.status==="Global_List"){
                    if(childData.priority===cardPriority){
                        tasksHobbyArray.push({
                            ...childSnapshot.val(),
                            fbID: childSnapshot.key
                        });
                    }
                    let tasks = new TaskItemController(taskItemDomHobby, tasksHobbyArray);
                    tasks.init();
                }
                else if(childData.category==='other'&&childData.status==="Global_List"){
                    if(childData.priority===cardPriority){
                        tasksOtherArray.push({
                            ...childSnapshot.val(),
                            fbID: childSnapshot.key
                        });
                    }
                    let tasks = new TaskItemController(taskItemDomOther, tasksOtherArray);
                    tasks.init();
                }
            })
        })
    }
}