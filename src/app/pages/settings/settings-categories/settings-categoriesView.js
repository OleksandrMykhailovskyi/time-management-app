import tmp from "./settings-categories.handlebars"

export class SettingsCategoriesView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    render(){
        this.root.innerHTML = tmp(this.model)
    }
}