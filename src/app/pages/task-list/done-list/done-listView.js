import doneList from "./done-list.handlebars"

export class DoneListView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    render(){
        this.root.innerHTML = doneList(this.model);
    }
    dailyActive(){
        let toDo = document.querySelector('.toggle-list__link--todo');
        let done = document.querySelector('.toggle-list__link--done');
        toDo.classList.remove('active');
        done.classList.add('active');
    }
}