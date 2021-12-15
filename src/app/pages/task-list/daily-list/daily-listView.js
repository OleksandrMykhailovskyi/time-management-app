import dailyList from "./daily-list.handlebars"

export class DailyListView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    render(){
        this.root.innerHTML = dailyList(this.model);
    }
    dailyActive(){
        let toDo = document.querySelector('.toggle-list__link--todo');
        let done = document.querySelector('.toggle-list__link--done');
        done.classList.remove('active');
        toDo.classList.add('active');
    }
}