export class TaskListModel {
    //the format of data (model) is created here
    constructor({tasks}){
        this.tasks=tasks;
    }
    //these 2 methods are created for the EventBus to work. registerObserver helps to add the event observers to the EventBus repo.
    registerObserver(...observers){
        this.observers.push(...observers);
    }
    notify(){
        this.observers.forEach(observer => observer.observe());
    }
}