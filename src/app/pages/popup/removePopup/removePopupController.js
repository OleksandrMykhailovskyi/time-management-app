import {RemovePopupModel} from './removePopupModel'
import {RemovePopupView} from './removePopupView'

export class RemovePopupController{
    constructor(root, model){
        this.model = new RemovePopupModel(model);
        this.view = new RemovePopupView(root, this.model);
        this.init();
    }
    init(){
        //the handlebars code is rendered here
        this.view.render();
    }
}