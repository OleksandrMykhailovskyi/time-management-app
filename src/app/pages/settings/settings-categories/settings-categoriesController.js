import {SettingsCategoriesModel} from './settings-categoriesModel'
import {SettingsCategoriesView} from './settings-categoriesView'

export class SettingsCategoriesController{
    constructor(root, model){
        this.model = new SettingsCategoriesModel(model);
        this.view = new SettingsCategoriesView(root, this.model);
        this.init();
    }
    init(){
        //the handlebars code is rendered here
        this.view.render();
    }
}