import firebase from '../../../firebase';
import {TaskItemController} from '../task-item/task-itemController';
import taskListMessage from "../task-list-message/taskListMessage.handlebars"

export class DailyListModel {
    //the format of data (model) is created here
    constructor({}){
    }
    //the method for the cards downloading
    downloadCards(){
        const taskItemDom = document.querySelector('.tasks-block__wrapper');
        let ref = firebase.database().ref("tasks");
        let tasksArray = [];
        ref.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                let childData = childSnapshot.val();
                if(childData.status==='Daily_List'){
                    tasksArray.push({
                            ...childSnapshot.val(),
                            fbID: childSnapshot.key
                        });
                    let tasks = new TaskItemController(taskItemDom, tasksArray);
                    tasks.init();
                }
            })
        })
        if(tasksArray.length===0){
            let options = {
                title: 'Excellent,',
                description: 'all daily tasks done :)'
            }
            $(taskListMessage(options)).replaceAll('.daily-list');
        }
    }
}