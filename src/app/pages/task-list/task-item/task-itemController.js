import {TaskItemModel} from './task-itemModel'
import {TaskItemView} from './task-itemView'
import {eventBus} from '../../../eventBus';
import {RemovePopupController} from '../../popup/removePopup/removePopupController';
import {EditPopupController} from '../../popup/editPopup/editPopupController';
import addFirstTask from '../addFirstTask.handlebars'
import './helper'

export class TaskItemController{
    constructor(root, model){
        this.model = new TaskItemModel(model);
        this.view = new TaskItemView(root, this.model);
    }
    init(){
        //the handlebars code is rendered here
        this.view.render();
        this.attachListeners();
    }
    attachListeners(){
        eventBus.subscribe('TRASH_WAS_CLICKED', (taskId) => {
            const removePopupDom = document.querySelector('#popup');
            const removePopupElem = new RemovePopupController(removePopupDom, {title:'removePopup'});
            removePopupElem.init();
            let sendButton = document.querySelector('.button--remove-task');
            sendButton.dataset.taskID = taskId;
            eventBus.subscribe('REMOVETASK_WAS_CLICKED', (taskToRemove) => {
                this.model.removeTask(taskToRemove);
                this.model.closePopUp();
            })
            eventBus.subscribe('CANCELREMOVETASK_WAS_CLICKED', () => {
                this.model.closePopUp();
            })
            eventBus.subscribe('CLOSE_WAS_CLICKED', () => {
                this.model.closePopUp();
            })
        });
        eventBus.subscribe('EDIT_WAS_CLICKED', (taskID) => {
            const editPopupDom = document.querySelector('#popup');
            const editPopupElem = new EditPopupController(editPopupDom, {title:'editPopup'});
            editPopupElem.init();
            this.model.fillInTask(taskID);
            let sendButton = document.querySelector('.popup-content__nav-icon--check');
            sendButton.dataset.taskID = taskID;
            eventBus.subscribe('CLOSE_WAS_CLICKED', () => {
                this.model.closePopUp();
            })
            eventBus.subscribe('CHECKMARK_TO_EDIT_WAS_CLICKED', (taskIdForFb) => {
                this.model.editTask(taskIdForFb);
                this.model.closePopUp();
            })
        });
        eventBus.subscribe('TODAILY_WAS_CLICKED', (taskId) => {
            const STATUS_DAILY = 'Daily_List';
            this.model.changeStatus(taskId, STATUS_DAILY);
        });
        eventBus.subscribe('GOTOTIMER_WAS_CLICKED', (taskId) => {
            //this is done to remove duplicated calls
            window.location.reload()
            const STATUS_ACTIVE = 'Active';
            this.model.changeStatus(taskId, STATUS_ACTIVE);
            this.model.statusNotSet(taskId);
            sessionStorage.setItem('timer', 'start')
            eventBus.publish('CHANGE_LOCATION', 'timer');
        });
    }
}