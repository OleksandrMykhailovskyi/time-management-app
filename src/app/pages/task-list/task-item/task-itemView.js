import taskItem from "./task-item.handlebars";
import { eventBus } from '../../../eventBus';

export class TaskItemView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    clean(){
        this.root.innerHTML = '';
    }
    render(){
        this.root.innerHTML = taskItem(this.model);
        this.attachListeners();
    }
    observe(){
        this.clean();
        this.render();
    }
    attachListeners(){
        const BTN_CONTAINER = document.querySelector('.page--task-list');
        if(BTN_CONTAINER){
            BTN_CONTAINER.addEventListener('click', (event) => {
                if(event.target.className.includes('icon-tomato--goToTimer')&&event.target.dataset.status==='Daily_List'){
                    const targetID = event.target.dataset.id;
                    eventBus.publish('GOTOTIMER_WAS_CLICKED', targetID);
                }
            })
        }
    }
}