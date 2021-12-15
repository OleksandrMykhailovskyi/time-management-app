import {GlobalListModel} from './global-listModel'
import {GlobalListView} from './global-listView'
import {eventBus} from '../../../eventBus';

export class GlobalListController{
    constructor(root, model){
        this.model = new GlobalListModel(model);
        this.view = new GlobalListView(root, this.model);
        this.init();
    }
    init(){
        //the handlebars code is rendered here
        this.view.render();
        //adding the tasks from FB
        this.model.downloadCards();
        this.view.globalActive();
        this.view.showCategoryName();
        this.attachListeners();
    }
    observe(){
        console.log("notify", this);
    }
    attachListeners(){
        eventBus.subscribe('ARROWDOWN', () => {
            const tasksWrapperNodes = document.querySelectorAll('.Global_List');
            tasksWrapperNodes.forEach(el =>{
                el.toggleAttribute('hidden');
            })
        })
        eventBus.subscribe('URGENT_FILTER_WAS_CLICKED', (target) => {
            this.view.filterWhite(target);
            this.model.downloadCardsFilter('urgent');
            this.view.showCategoryName();
        })
        eventBus.subscribe('HIGH_FILTER_WAS_CLICKED', (target) => {
            this.view.filterWhite(target);
            this.model.downloadCardsFilter('high');
            this.view.showCategoryName();
        })
        eventBus.subscribe('MIDDLE_FILTER_WAS_CLICKED', (target) => {
            this.view.filterWhite(target);
            this.model.downloadCardsFilter('middle');
            this.view.showCategoryName();
        })
        eventBus.subscribe('LOW_FILTER_WAS_CLICKED', (target) => {
            this.view.filterWhite(target);
            this.model.downloadCardsFilter('low');
            this.view.showCategoryName();
        })
        eventBus.subscribe('ALL_FILTER_WAS_CLICKED', (target) => {
            this.view.filterWhite(target);
            this.model.downloadCards();
            this.view.showCategoryName();
        })
    }
}