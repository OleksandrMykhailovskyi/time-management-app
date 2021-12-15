import firebase from '../../../firebase';
// require("../task-list/task-item/helper");

export class EditPopupModel {
    //the format of data (model) is created here
    constructor({id,status,title}){
        this.id = id;
        this.status=status;
        this.title = title;
    }
    //these 2 methods are created for the EventBus to work. registerObserver helps to add the event observers to the EventBus repo.
    registerObserver(...observers){
        this.observers.push(...observers);
    }
    notify(){
        this.observers.forEach(observer => observer.observe());
    }
}