import editTask from "./editTask.handlebars"
import { eventBus } from '../../../eventBus';
// require('../task-list/task-item/helper');

export class EditPopupView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    render(){
        this.root.innerHTML = editTask(this.model);
        const BTN_CHECKMARK = document.querySelector('.icon-check');
        const BTN_CLOSE = document.getElementById('icon-close--edit-task');
        if(BTN_CHECKMARK){
            BTN_CHECKMARK.addEventListener('click', (event) => {
                const targetID = event.target.dataset.taskID;
                eventBus.publish('CHECKMARK_TO_EDIT_WAS_CLICKED', targetID);
            });
        }
        if(BTN_CLOSE){
            BTN_CLOSE.addEventListener('click', () => {
                eventBus.publish('CLOSE_WAS_CLICKED');
            });
        }
    }
}