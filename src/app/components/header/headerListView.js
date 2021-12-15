// creating header component
import tmp from "./header.handlebars";
import {eventBus} from '../../eventBus';

export class HeaderListView{
    constructor(root, model){
        this.root = root;
        this.model = model;
        window.addEventListener('scroll', this.headerScroll);
    }
    render(){
        this.root.innerHTML = tmp(this.model);
        this.attachListeners();
    }
    headerScroll(){
        let current_scroll_position = 0;
        let header = document.querySelector('.header');
        let title = document.querySelector('.title');
        let logo = document.querySelector('.logo');
        current_scroll_position = window.scrollY;
        if(current_scroll_position!==0){
            //if title exists at the page
            if(title){
                title.classList.add("display--none");
            }
            header.classList.add("header--scroll-down");
            if(logo){
                logo.classList.remove("display--none");
            }
        }else{
            if(title){
                title.classList.remove("display--none");
            }
            if(logo){
                logo.classList.add("display--none");
            }
            header.classList.remove("header--scroll-down");
        }
    }
    navigateToTaskList(){
        eventBus.publish('CHANGE_LOCATION', 'task-list');
    }
    navigateToSettings(){
        eventBus.publish('CHANGE_LOCATION', 'settings');
    }
    navigateToReports(){
        eventBus.publish('CHANGE_LOCATION', 'reports');
    }
    attachListeners(){
        const NAV_CONTAINER = document.querySelector('.menu__list');
        if(NAV_CONTAINER){
            NAV_CONTAINER.addEventListener('click', (event) => {
                if(event.target.className.includes('icon-settings')){
                    eventBus.publish('TO_SETTINGS_WAS_CLICKED');
                }
                else if(event.target.className.includes('icon-statistics')){
                    eventBus.publish('TO_REPORTS_WAS_CLICKED');
                }
                else if(event.target.className.includes('icon-list')){
                    eventBus.publish('GO_TO_TASKS_WAS_CLICKED');
                }
            })
        }
    };
}