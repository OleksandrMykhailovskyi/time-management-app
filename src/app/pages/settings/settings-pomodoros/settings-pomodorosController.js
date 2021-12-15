import {SettingsPomodorosModel} from './settings-pomodorosModel'
import {SettingsPomodorosView} from './settings-pomodorosView'

export class SettingsPomodorosController{
    constructor(root, model){
        this.model = new SettingsPomodorosModel(model);
        this.view = new SettingsPomodorosView(root, this.model);
        this.init();
    }
    init(){
        //the handlebars code is rendered here
        this.view.render();
    }
}