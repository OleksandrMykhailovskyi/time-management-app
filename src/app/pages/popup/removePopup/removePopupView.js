import tmp from "./removeTask.handlebars";
import { eventBus } from '../../../eventBus';

export class RemovePopupView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    render(){
        this.root.innerHTML = tmp(this.model);
        const BTN_REMOVETASK = document.querySelector('.button--remove-task');
        const BTN_CANCELREMOVETASK = document.querySelector('.button--cancel-remove-task');
        const BTN_CLOSE = document.getElementById('icon-close--remove-task');
        if(BTN_REMOVETASK){
            BTN_REMOVETASK.addEventListener('click', (event) => {
                const targetID = event.target.dataset.taskID;
                eventBus.publish('REMOVETASK_WAS_CLICKED', targetID);
            });
        }
        if(BTN_CANCELREMOVETASK){
            BTN_CANCELREMOVETASK.addEventListener('click', () => {
                eventBus.publish('CANCELREMOVETASK_WAS_CLICKED');
            });
        }
        if(BTN_CLOSE){
            BTN_CLOSE.addEventListener('click', () => {
                eventBus.publish('CLOSE_WAS_CLICKED');
            });
        }
    }
}