import tmp from "./settings.handlebars";
import {eventBus} from '../../eventBus';
import { SettingsCategoriesController } from "./settings-categories/settings-categoriesController";
import { SettingsPomodorosController } from "./settings-pomodoros/settings-pomodorosController";

export class SettingsView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    render(){
        this.root.innerHTML = tmp(this.model);
        this.paintSettingsIcon();
        this.attachListeners();
    }
    //rendering SettingsCategories page
    renderCategories(){
        this.paintCategoriesLink();
        const settingsWrapper = document.querySelector('.page--settings__sections-wrapper');
        const settingsCategories = new SettingsCategoriesController(settingsWrapper);
        settingsCategories.init();
    }
    //rendering SettingsPomodoros page
    renderPomodoros(){
        this.paintPomodorosLink();
        const settingsWrapper = document.querySelector('.page--settings__sections-wrapper');
        const settingsPomodoros = new SettingsPomodorosController(settingsWrapper);
        settingsPomodoros.init();
    }
    //making Settings icon in header white
    paintSettingsIcon(){
        const targetElement = document.querySelector('.icon-settings');
        targetElement.style.color='white';
    }
    paintPomodorosLink(){
        const categoriesLink = document.querySelector('.toggle-list__link--categories');
        const pomodorosLink = document.querySelector('.toggle-list__link--pomodoros');
        categoriesLink.style.color='';
        pomodorosLink.style.color='white';
    }
    paintCategoriesLink(){
        const categoriesLink = document.querySelector('.toggle-list__link--categories');
        const pomodorosLink = document.querySelector('.toggle-list__link--pomodoros');
        pomodorosLink.style.color='';
        categoriesLink.style.color='white';
    }
    navigateToTaskList(){
        eventBus.publish('CHANGE_LOCATION', 'task-list');
    }
    attachListeners(){
        const BTN_POMODOROS_CONTAINER = document.querySelector('.page--settings');
        if(BTN_POMODOROS_CONTAINER){
            BTN_POMODOROS_CONTAINER.addEventListener('click', (event) => {
                if(event.target.className.includes('button--save')){
                    eventBus.publish('SAVE-SETTINGS_WAS_CLICKED');
                }
                if(event.target.className.includes('button--goToTask')){
                    eventBus.publish('GO_TO_TASKS_WAS_CLICKED');
                }
                if(event.target.className.includes('toggle-list__link--categories')){
                    eventBus.publish('TO_CATEGORIES_WAS_CLICKED');
                }
                if(event.target.className.includes('toggle-list__link--pomodoros')){
                    eventBus.publish('TO_POMODOROS_WAS_CLICKED');
                }
                if(event.target.className.includes('button--amount-plus')){
                    const targetElement = event.target;
                    eventBus.publish('PLUS_WAS_CLICKED', targetElement);
                    eventBus.publish('SETTING_WAS_CHANGED');
                }else if(event.target.className.includes('button--amount-minus')){
                    const targetElement = event.target;
                    eventBus.publish('MINUS_WAS_CLICKED', targetElement);
                    eventBus.publish('SETTING_WAS_CHANGED');
                }
            })
        }
    }
}