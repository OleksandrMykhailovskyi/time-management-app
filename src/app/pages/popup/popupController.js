import {PopupModel} from './popupModel';
import {PopupView} from './popupView';
import { eventBus } from '../../eventBus';
import initDatePicker from './dataPicker/dataPicker';

export class PopupController{
    constructor(root, model){
        this.model = new PopupModel(model);
        this.view = new PopupView(root, this.model);
        this.init();
    }
    init(){
        //the handlebars code is rendered here
        this.view.render();
        initDatePicker();
        eventBus.subscribe('CHECKMARK_WAS_CLICKED', () => {
            try{
                this.model.getInput();
                this.model.closePopUp();
            }
            catch(e){
                console.error('this is the error ' + e);
            }
        })
        eventBus.subscribe('CLOSE_WAS_CLICKED', () => {
            this.model.closePopUp();
        })
    }
}