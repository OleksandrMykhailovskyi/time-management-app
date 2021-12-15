import {HeaderListModel} from './headerListModel';
import {HeaderListView} from './headerListView';
import {eventBus} from '../../eventBus';

export class HeaderListController{
    constructor(root, model){
        this.model = new HeaderListModel(model);
        this.view = new HeaderListView(root, this.model);
        this.init();
    }
    init(){
        //the handlebars code is rendered here
        this.view.render();
        this.attachListeners();
    }
    attachListeners(){
        eventBus.subscribe('TO_SETTINGS_WAS_CLICKED', () => {
            this.view.navigateToSettings();
        });
        eventBus.subscribe('TO_REPORTS_WAS_CLICKED', () => {
            this.view.navigateToReports();
        });
        eventBus.subscribe('GO_TO_TASKS_WAS_CLICKED', () => {
            this.view.navigateToTaskList();
        });
    }
}