import {EditPopupModel} from './editPopupModel'
import {EditPopupView} from './editPopupView'
import initDatePicker from '../dataPicker/dataPicker';

export class EditPopupController{
    constructor(root, model){
        this.model = new EditPopupModel(model);
        this.view = new EditPopupView(root, this.model);
        this.init();
    }
    init(){
        //the handlebars code is rendered here
        this.view.render();
        initDatePicker();
    }
}