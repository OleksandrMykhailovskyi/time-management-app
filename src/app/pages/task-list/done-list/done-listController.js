import {DoneListModel} from './done-listModel';
import {DoneListView} from './done-listView';

export class DoneListController{
    constructor(root, model){
        this.model = new DoneListModel(model);
        this.view = new DoneListView(root, this.model);
        this.init();
    }
    init(){
        //the handlebars code is rendered here
        this.view.render();
        //adding the tasks from FB
        this.model.downloadCards();
        this.view.dailyActive();
    }
    observe(){
        console.log("notify", this);
    }
}