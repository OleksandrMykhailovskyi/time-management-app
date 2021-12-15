import {TimerModel} from './timerModel';
import {TimerView} from './timerView';
import {eventBus} from '../../eventBus';

export class TimerController{
    constructor(root, model){
        this.model = new TimerModel(model);
        this.view = new TimerView(root, this.model);
        this.init();
    }
    init(){
        this.view.render();
        this.attachListeners();
    }
    attachListeners(){
        //to Task-List Array
        eventBus.subscribe('ARROW_TO_TASKS_WAS_CLICKED', (taskId) => {
            if(taskId){
                this.model.changeStatus(taskId, 'Daily_List');
            }
            this.model.goToDailyList();
        })
        //go to Reports Array
        eventBus.subscribe('ARROW_TO_REPORTS_WAS_CLICKED', () => {
            this.model.goToReports();
        })
        //the event for Finish task button
        eventBus.subscribe('BTN_FINISH_TASK_WAS_CLICKED', (taskId) => {
            this.model.changeStatus(taskId, 'Completed');
            this.model.taskCompleted();
        })
        //the event for Start task button
        eventBus.subscribe('BTN_START_TASK_WAS_CLICKED', () => {
            this.model.startTask();
        })
        eventBus.subscribe('BTN_FAIL_POMODORA_WAS_CLICKED', (taskID) => {
            this.model.pomodoroBreak();
            this.model.pomodoroStatusHandler('failed');
        })
        eventBus.subscribe('BTN_FINISH_POMODORA_WAS_CLICKED', (taskID) => {
            this.model.pomodoroBreak();
            this.model.pomodoroStatusHandler('success');
        })
        eventBus.subscribe('BTN_START_POMODORA_WAS_CLICKED', (taskID) => {
            this.model.startTask();
        })
        eventBus.subscribe('ADD_POMODORO_ESTIMATION_WAS_CLICKED', (taskId) => {
            this.model.addEstimation(taskId);
        })
    }
}