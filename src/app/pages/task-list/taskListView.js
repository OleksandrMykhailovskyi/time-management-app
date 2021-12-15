import { eventBus } from '../../eventBus';

export class TaskListView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    clean(){
        this.root.innerHTML = '';
    }
    render(filename) {
        this.root.innerHTML = filename(this.model);
        this.paintTaskListIcon();
        this.attachListeners();
    }
    observe(){
        this.clean();
        this.render();
    }
    paintTaskListIcon(){
        const targetElement = document.querySelector('.icon-list');
        targetElement.style.color='white';
    }
    showCategoryName(){
        debugger
        let categories = document.querySelectorAll('.section-category-title');
        for(let i=0;i<categories.length;i++){
            if(categories[i].nextElementSibling.children.length>0&&categories[i].nextElementSibling.children[0].hidden===false){
                categories[i].hidden=false;
            }else{
                categories[i].hidden=true;
            }
        }
    }
    //the event is called here from the EventBus repository
    attachListeners(){
        const BTN_SKIP = document.querySelector('.button--goToTask');
        const BTN_goToSettings = document.querySelector('.button--goToSettings');
        const BTN_plus = document.querySelector('.title-plus');
        const BTN_DONE = document.querySelector('.toggle-list__link--done');
        const BTN_TODO = document.querySelector('.toggle-list__link--todo');
        const TASK_LIST_WRAPPER = document.querySelector('.page--task-list');
        if(TASK_LIST_WRAPPER){
            TASK_LIST_WRAPPER.addEventListener('click', (event) => {
                if(event.target.className.includes('button--goToSettings')){
                    eventBus.publish('GoToSettings_WAS_CLICKED');
                }
            })
        }
        if(BTN_SKIP){
            BTN_SKIP.addEventListener('click', () => {
                eventBus.publish('SKIP_WAS_CLICKED');
            });
        }
        if(BTN_goToSettings){
            BTN_goToSettings.addEventListener('click', () => {
                eventBus.publish('GoToSettings_WAS_CLICKED');
            });
        }
        if(BTN_plus){
            BTN_plus.addEventListener('click', () => {
                eventBus.publish('AddTask_WAS_CLICKED');
            });
        }
        if(BTN_DONE){
            BTN_DONE.addEventListener('click', () => {
                let targetElem = event.target;
                eventBus.publish('DONE_WAS_CLICKED', targetElem);
            });
        }
        if(BTN_TODO){
            BTN_TODO.addEventListener('click', (event) => {
                let targetElem = event.target;
                eventBus.publish('TODO_WAS_CLICKED', targetElem);
            });
        }
    }
}