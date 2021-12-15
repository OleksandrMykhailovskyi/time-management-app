import {TaskListModel} from './taskListModel';
import {TaskListView} from './taskListView';
import {eventBus} from '../../eventBus';
import {PopupController} from '../popup/popupController'
import {GlobalListController} from '../task-list/global-list/global-listController'
import {DailyListController} from '../task-list/daily-list/daily-listController'
import {DoneListController} from '../task-list/done-list/done-listController'
import tasksList from './task-list.handlebars';
import firstView from './first-page.handlebars';
import addFirstTask from './addFirstTask.handlebars'

export class TaskListController{
    constructor(root, model){
        this.model = new TaskListModel(model);
        this.view = new TaskListView(root, this.model);
        this.init();
    }
    init(){
        const isFirstVisit = sessionStorage.getItem('isFirstVisit');
        const view = !isFirstVisit ? firstView : tasksList;
        if (!isFirstVisit) {
            sessionStorage.setItem('isFirstVisit', true);
        }
        //the handlebars code is rendered here
        this.view.render(view);
        this.attachListeners();
        //adding the daily list here
        const dailyListWrapper = document.querySelector('.daily-list');
        const dailyList = new DailyListController(dailyListWrapper, {title:'daily-list'});
        dailyList.init();
        //adding the global list here
        const taskListWrapper = document.querySelector('.page--task-list__tasks');
        const globalList = new GlobalListController(taskListWrapper, {title:'global-list'});
        globalList.init();
    }
    observe(){
        console.log("notify", this);
    }
    //attachListeners is the method that calls publish and subscribe methods
    attachListeners(){
        //the event is added to the eventBus repository
        eventBus.subscribe('SKIP_WAS_CLICKED', () => {
            this.view.render(addFirstTask);
        })
        eventBus.subscribe('GoToSettings_WAS_CLICKED', () => {
            eventBus.publish('CHANGE_LOCATION', 'settings');
        })
        eventBus.subscribe('AddTask_WAS_CLICKED', () => {
            const popupDom = document.querySelector('#popup');
            const popupElem = new PopupController(popupDom, {
                status: 'Global_List',
                title: 'test999'
            });
            popupElem.init();
        })
        //TO-DO filter
        eventBus.subscribe('TODO_WAS_CLICKED', (target) => {
            const dailyListWrapper = document.querySelector('.daily-list');
            const dailyList = new DailyListController(dailyListWrapper, {title:'daily-list'});
            dailyList.init();
            const tasksWrapperNodes = document.querySelectorAll('.cells');
            tasksWrapperNodes.forEach(el =>{
                //this is done for all the cells to become visible first
                el.hidden=false;
                if(el.dataset.status!=='Daily_List'&&el.dataset.status!=='Global_List'){
                    el.hidden=true;
                }
            })
        })
        eventBus.subscribe('DONE_WAS_CLICKED', (target) => {
            const dailyListWrapper = document.querySelector('.daily-list');
            const doneList = new DoneListController(dailyListWrapper, {title:'done-list'});
            doneList.init();
            const tasksWrapperNodes = document.querySelectorAll('.cells');
            tasksWrapperNodes.forEach(el =>{
                //this is done for all the cells to become visible first
                el.hidden=false;
                if(el.dataset.status!=='Completed'){
                    el.hidden=true;
                }
            })
            this.view.showCategoryName();
        })
    }
}