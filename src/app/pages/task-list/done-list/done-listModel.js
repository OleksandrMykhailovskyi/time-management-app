import firebase from '../../../firebase';
import {TaskItemController} from '../task-item/task-itemController';

export class DoneListModel {
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
        const taskItemDom = document.querySelector('.tasks-block__wrapper');
        let ref = firebase.database().ref("tasks");
        ref.on("value", function(snapshot) {
            let tasksArray = [];
            snapshot.forEach(function(childSnapshot) {
                let childData = childSnapshot.val();
                if(childData.status==='Completed'){
                    tasksArray.push({
                            ...childSnapshot.val(),
                            fbID: childSnapshot.key
                        });
                    let tasks = new TaskItemController(taskItemDom, tasksArray);
                    tasks.init();
                }
            })
        })
    }
}