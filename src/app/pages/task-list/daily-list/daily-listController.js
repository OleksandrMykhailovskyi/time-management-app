import {DailyListModel} from './daily-listModel';
import {DailyListView} from './daily-listView';

export class DailyListController{
    constructor(root, model){
        this.model = new DailyListModel(model);
        this.view = new DailyListView(root, this.model);
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