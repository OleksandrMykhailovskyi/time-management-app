import {SettingsModel} from './settingsModel';
import {SettingsView} from './settingsView';
import {eventBus} from '../../eventBus';

export class SettingsController{
    constructor(root, model){
        this.model = new SettingsModel(model);
        this.view = new SettingsView(root, this.model);
        this.init();
    }
    init(){
        this.view.render();
        this.view.renderPomodoros();
        this.model.fillInSettingsInputs();
        this.attachListeners();
    }
    attachListeners(){
        eventBus.subscribe('PLUS_WAS_CLICKED', (targetElement) => {
            this.model.plusHandler(targetElement);
        });
        eventBus.subscribe('MINUS_WAS_CLICKED', (targetElement) => {
            this.model.minusHandler(targetElement);
        });
        eventBus.subscribe('SETTING_WAS_CHANGED', () => {
            this.model.createCycle();
        });
        eventBus.subscribe('SAVE-SETTINGS_WAS_CLICKED', () => {
            try{
                this.model.sendDataToFB();
                this.view.navigateToTaskList();
            }catch(e){
                console.error(e);
            }
        });
        eventBus.subscribe('GO_TO_TASKS_WAS_CLICKED', () => {
            this.view.navigateToTaskList();
        });
        eventBus.subscribe('TO_CATEGORIES_WAS_CLICKED', () => {
            this.view.renderCategories();
            eventBus.publish('CHANGE_LOCATION', 'settings/categories');
        });
        eventBus.subscribe('TO_POMODOROS_WAS_CLICKED', () => {
            this.view.renderPomodoros();
            this.model.fillInSettingsInputs();
            eventBus.publish('CHANGE_LOCATION', 'settings/pomodoros');
        });
        eventBus.subscribe('TO_SETTINGS_WAS_CLICKED', (targetElement) => {
            this.view.paintSettingsIcon(targetElement);
        });
    }
}