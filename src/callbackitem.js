// С применением ООП
export default class inputItem{
    constructor(item) {
        this.type = item.type;
        this.label = item.label;
        this.placeholder = item.placeholder;
        this.name = item.name;
    }
    render() {
        let element;
        if (this.type == "textarea") {
            element = `<textarea name="${this.name}" placeholder="${this.placeholder}" wrap="hard"></textarea>`;
        } else if (this.type == "submit") {
            element = `<input type="${this.type}" name="${this.name}" placeholder="${this.placeholder}" value="Отправить">`;
        } else {
            element = `<input type="${this.type}" name="${this.name}" placeholder="${this.placeholder}">`;
        }
        let img = `<img src="img/${this.name}.png" alt="">`;
        return `
            <div class="callback__item">
                ${this.type!='submit'? img : ''}
                
                <div>
                    <span>${this.label}</span>
                    ${element}
                </div>
            </div>
        `;
    }
}