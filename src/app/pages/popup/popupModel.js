import firebase from '../../firebase';
// import jQuery from 'jquery';
import '../notification/notification-jquery'
import './dataPicker/dataPicker'
require("../task-list/task-item/helper");

export class PopupModel {
    //the format of data (model) is created here
    constructor({status,title}){
        this.status=status;
        this.title = title;
    }
    //these 2 methods are created for the EventBus to work. registerObserver helps to add the event observers to the EventBus repo.
    registerObserver(...observers){
        this.observers.push(...observers);
    }
    notify(){
        this.observers.forEach(observer => observer.observe());
    }
    getInput(){
        const db = firebase.database();
        //take all the inputs from the modal window
        const inputs = document.querySelectorAll('.items-form__value');
        const radioButtons  = document.querySelectorAll('.check__input, .check__input--estimation');
        //taking the datapicker elemen
        const date = document.getElementById('datePick');
        let values = {};
        //adding the values from the text inputs to the objects
        try{
            for(let i=0;i<inputs.length;i++){
                values[inputs[i].name]=inputs[i].value;
            }
            //adding the values from the checked radiobutton inputs to the objects
            for(let i=0;i<radioButtons.length;i++){
                if(radioButtons[i].checked){
                    values[radioButtons[i].name]=radioButtons[i].value;
                }
            }
        }
        catch(e){
            console.log(e)
        }
        values.deadline = date.value;
        values.status=this.status;
        values.createDate = new Date();
        let sendData = (object) =>{
            let ref = db.ref('tasks');
            try{
                ref.push(object);
                //calling Notification jQuery plugin
                jQuery('#root1').notificationPlugin({
                    type: 'success',
                    message: 'Your task was successfully saved',
                    icon: 'icon-tomato-success',
                    time: 5000
                })
            } catch(e){
                jQuery('#root1').notificationPlugin({
                    type: 'error',
                    message: 'Unable to save your task. Try again later',
                    icon: 'icon-tomato-error',
                    time: 5000
                })
            }
        }
        sendData(values);
    }
    closePopUp(){
        const popupDOM = document.querySelector('#popup');
        popupDOM.innerHTML='';
    }
}