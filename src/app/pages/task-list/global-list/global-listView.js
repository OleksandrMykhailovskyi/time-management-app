import globalList from "./global-list.handlebars"
import { eventBus } from '../../../eventBus';

export class GlobalListView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    render(){
        this.root.innerHTML = globalList(this.model);
        this.attachListeners();
    }
    filterWhite(target){
        // Get the container element
        const btnContainer = document.querySelector('.toggle-list--global-filter');
        // Get all buttons with class="btn" inside the container
        const btns = btnContainer.getElementsByClassName('toggle-list__link--global-filter');
        // Loop through the buttons and add the active class to the current/clicked button
        for(let i=0;i<btns.length;i++){
            btns[i].classList.remove('active');
            if(btns[i]===target){
                btns[i].classList.add('active');
            }
        }
    }
    globalActive(){
        let allFiter = document.querySelector('.toggle-list__link--all');
        allFiter.classList.add('active');
    }
    showCategoryName(){
        let categories = document.querySelectorAll('.section-category-title');
        for(let i=0;i<categories.length;i++){
            if(categories[i].nextElementSibling.children.length>0){
                categories[i].hidden=false;
            }else{
                categories[i].hidden=true;
            }
        }
    }
    attachListeners(){
        const BTN_CONTAINER = document.querySelector('.page--task-list');
        const BTN_DONE = document.querySelector('.toggle-list__link--done');
        const BTN_ARROWDOWN = document.querySelector('.icon-global-list-arrow-down');
        //Filters DOM-elements
        const ALL_FILTER = document.querySelector('.toggle-list__link--all');
        const URGENT_FILTER = document.querySelector('.toggle-list__link--urgent');
        const HIGH_FILTER = document.querySelector('.toggle-list__link--high');
        const MIDDLE_FILTER = document.querySelector('.toggle-list__link--middle');
        const LOW_FILTER = document.querySelector('.toggle-list__link--low');
        if(BTN_DONE){
            BTN_DONE.addEventListener('click', () => {
                eventBus.publish('DONE_WAS_CLICKED');
            });
        }
        if(BTN_ARROWDOWN){
            BTN_ARROWDOWN.addEventListener('click', () => {
                eventBus.publish('ARROWDOWN');
            });
        }
        if(ALL_FILTER){
            ALL_FILTER.addEventListener('click', (event) => {
                let target = event.target;
                eventBus.publish('ALL_FILTER_WAS_CLICKED', target);
            });
        }
        if(URGENT_FILTER){
            URGENT_FILTER.addEventListener('click', (event) => {
                let target = event.target;
                eventBus.publish('URGENT_FILTER_WAS_CLICKED', target);
            });
        }
        if(HIGH_FILTER){
            HIGH_FILTER.addEventListener('click', (event) => {
                let target = event.target;
                eventBus.publish('HIGH_FILTER_WAS_CLICKED', target);
            });
        }
        if(MIDDLE_FILTER){
            MIDDLE_FILTER.addEventListener('click', (event) => {
                let target = event.target;
                eventBus.publish('MIDDLE_FILTER_WAS_CLICKED', target);
            });
        }
        if(LOW_FILTER){
            LOW_FILTER.addEventListener('click', (event) => {
                let target = event.target;
                eventBus.publish('LOW_FILTER_WAS_CLICKED', target);
            });
        }
        //the event-listeners for the trash and edit icons
        if(BTN_CONTAINER){
            BTN_CONTAINER.addEventListener('click', (event) => {
                if(event.target.className.includes('cells-navs__link--trash')){
                    const targetID = event.target.dataset.id;
                    eventBus.publish('TRASH_WAS_CLICKED', targetID);
                }
                if(event.target.className.includes('cells-navs__link--edit')){
                    const targetObj = event.target.dataset.obj;
                    eventBus.publish('EDIT_WAS_CLICKED', targetObj);
                }
                if(event.target.className.includes('cells-navs__link--arrows-up')){
                    const targetObj = event.target.dataset.id;
                    eventBus.publish('TODAILY_WAS_CLICKED', targetObj);
                }
            });
        };
    }
}