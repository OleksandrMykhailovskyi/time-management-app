import { eventBus } from '../../eventBus';
import {ReportsModel} from './reportsModel'
import {ReportsView} from './reportsView'

export class ReportsController{
    constructor(root, model){
        this.model = new ReportsModel(model);
        this.view = new ReportsView(root, this.model);
        this.init();
        this.urlLocation = window.location.href;
    }
    init(){
        //the handlebars code is rendered here
        this.view.render();
        this.view.hoverLocation();
        this.attachListeners();
    }

    attachListeners(){
        eventBus.subscribe('ARROW_TO_TASKS_WAS_CLICKED', () => {
            this.view.goToDailyList();
        })
        eventBus.subscribe('REPORTS_DAY_NAVIGATE', (str) => {
            let urlLocation = window.location.href;
            let getLine = urlLocation.substr(22);
            if(getLine.includes('pomodoros')){
                eventBus.publish('CHANGE_LOCATION', 'reports/day/pomodoros');
            }else{
                eventBus.publish('CHANGE_LOCATION', 'reports/day/tasks');
            }
            this.view.hoverLocation();
        });
        eventBus.subscribe('REPORTS_WEEK_NAVIGATE', (str) => {
            let urlLocation = window.location.href;
            let getLine = urlLocation.substr(22);
            if(getLine.includes('pomodoros')){
                eventBus.publish('CHANGE_LOCATION', 'reports/week/pomodoros');
            }else{
                eventBus.publish('CHANGE_LOCATION', 'reports/week/tasks');
            }
            this.view.hoverLocation();
        })
        eventBus.subscribe('REPORTS_MONTH_NAVIGATE', (str) => {
            let urlLocation = window.location.href;
            let getLine = urlLocation.substr(22);
            if(getLine.includes('pomodoros')){
                eventBus.publish('CHANGE_LOCATION', 'reports/month/pomodoros');
            }else{
                eventBus.publish('CHANGE_LOCATION', 'reports/month/tasks');
            }
            this.view.hoverLocation();
        })
        eventBus.subscribe('REPORTS_POMODOROS_NAVIGATE', (targetElement) => {
            let urlLocation = window.location.href;
            let getLine = urlLocation.substr(22).replace(/tasks/gi, 'pomodoros')
            eventBus.publish('CHANGE_LOCATION', getLine);
            this.view.addActive(targetElement);
        });
        eventBus.subscribe('REPORTS_TASKS_NAVIGATE', (targetElement) => {
            let urlLocation = window.location.href;
            let getLine = urlLocation.substr(22).replace(/pomodoros/gi, 'tasks')
            eventBus.publish('CHANGE_LOCATION', getLine);
            this.view.addActive(targetElement);
        });
    }
}