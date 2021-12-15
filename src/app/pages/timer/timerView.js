import tmp from "./timer.handlebars"
import {eventBus} from '../../eventBus';

export class TimerView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    render(){
        this.root.innerHTML = tmp(this.model);
        this.attachListeners();
    }
    attachListeners(){
        const TIMER_CONTAINER = document.querySelector('.timer');
        if(TIMER_CONTAINER){
            TIMER_CONTAINER.addEventListener('click', (event) => {
                if(event.target.className.includes('icon-arrow-left')){
                    const targetID = event.target.dataset.id;
                    eventBus.publish('ARROW_TO_TASKS_WAS_CLICKED', targetID);
                }
                if(event.target.className.includes('icon-arrow-right')){
                    const targetID = event.target.dataset.id;
                    eventBus.publish('ARROW_TO_REPORTS_WAS_CLICKED', targetID);
                }
                if(event.target.className.includes('button--fail-pomodoro')){
                    const targetID = event.target.dataset.id;
                    eventBus.publish('BTN_FAIL_POMODORA_WAS_CLICKED', targetID);
                }
                if(event.target.className.includes('button--finish-pomodoro')){
                    const targetID = event.target.dataset.id;
                    eventBus.publish('BTN_FINISH_POMODORA_WAS_CLICKED', targetID);
                }
                if(event.target.className.includes('button--start-task')){
                    const targetID = event.target.dataset.id;
                    eventBus.publish('BTN_START_TASK_WAS_CLICKED', targetID);
                }
                if(event.target.className.includes('button--start-pomodoro')){
                    const targetID = event.target.dataset.id;
                    eventBus.publish('BTN_START_POMODORA_WAS_CLICKED', targetID);
                }
                if(event.target.className.includes('button--finish-task')){
                    const targetID = event.target.dataset.id;
                    eventBus.publish('BTN_FINISH_TASK_WAS_CLICKED', targetID);
                }
                if(event.target.className.includes('icon-add')){
                    const targetID = event.target.dataset.id;
                    eventBus.publish('ADD_POMODORO_ESTIMATION_WAS_CLICKED', targetID);
                }
            });
        }
    }
}