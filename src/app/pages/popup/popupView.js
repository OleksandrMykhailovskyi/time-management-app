import addTask from "./addTask.handlebars"
import { eventBus } from '../../eventBus';
require('../task-list/task-item/helper');

export class PopupView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    render(){
        this.root.innerHTML = addTask(this.model);
        const BTN_CHECKMARK = document.querySelector('.icon-check');
        const BTN_CLOSE = document.getElementById('icon-close');
        if(BTN_CHECKMARK){
            BTN_CHECKMARK.addEventListener('click', () => {
                eventBus.publish('CHECKMARK_WAS_CLICKED');
            });
        }
        if(BTN_CLOSE){
            BTN_CLOSE.addEventListener('click', () => {
                eventBus.publish('CLOSE_WAS_CLICKED');
            });
        }
    }
}