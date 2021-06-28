
export default Vue.component("hamburger",{
    // props:["query","errorBox"],
    template:`
            <div class="hamburger__content"></div>
    `,
    mounted(){
        let hamburger = new HamburgerPage(".hamburger__content");
    }
});

//Вставлен код, разработанный на 2 уроке JS level 2
class HamburgerPage{
    constructor(targetContainer) {
        this.options = [];
        this.renderCaptions(targetContainer);
        this._fetchOptions();
        this.renderBox();
        this.hamburger = new Hamburger(); //на странице возможен один гамбургер для  включения в заказ
    }

    _fetchOptions() { //загрузка перечня опций гамбургера (в будущем из бэкэнда)
        this.options[0] = [
            { type: "base", name: "small", fullname: "Маленький", price: 50, caloricValue: 20, checked: false },
            { type: "base", name: "big", fullname: "Большой", price: 100, caloricValue: 40, checked: true },
        ];
        this.options [1]= [
            { type: "fill", name: "cheese", fullname: "Сыр", price: 10, caloricValue: 20, checked: true },
            { type:"fill", name: "salad",fullname: "Салат", price: 20, caloricValue: 5, checked:false },
            { type:"fill", name: "potato",fullname: "Картофель", price: 15, caloricValue: 10, checked:false },
        ];
        this.options [2]= [
            { type: "adds", name: "spice", fullname: "Перец", price: 15, caloricValue: 0, checked: false },
            { type:"adds", name: "mainonaise",fullname: "Майонез", price: 20, caloricValue: 5, checked:false }
        ];
    }

    renderCaptions(targetContainer) { //отрисовка формы с заголовком и итогами
        let targetContainerElement=document.querySelector(targetContainer);
        this.container = document.createElement("form");
        this.container.name = "hamb";
        this.container.classList.add("hamburger__container");
        targetContainerElement.insertAdjacentHTML("beforeend", `
                        <div class="hamburger__desc">
                            Сформируй свой бургер<span>&dArr;</span>
                        </div>`);
        targetContainerElement.insertAdjacentElement("beforeend", this.container);
        targetContainerElement.insertAdjacentHTML("beforeend", `
                        <div class="hamburger__total">
                            <div class="hamburger__total-price">Итого: <span id="totalPrice"></span> </div>
                            <div class="hamburger__total-calories">Калорий: <span id="totalCalories"></span></div>
                            <div class="hamburger__total-order">Заказать</div>
                        </div>`);
        document.querySelector(".hamburger__total-order").addEventListener("click",this.order);

    }

    renderBox() { //отрисовка бокса с выбором опций гамбургера
        for (let index in this.options) {
            let optionGroup = document.createElement("div"); //группа опций
            optionGroup.classList.add("hamburger__group");
            this.container.append(optionGroup);
            for (let optionItem of this.options[index]) {  //опция гамбургера
                let optionItemElement = new OptionItem(optionItem).getElement();
                optionGroup.insertAdjacentElement("beforeend", optionItemElement);
                optionItemElement.addEventListener("change", () => {this.hamburger = new Hamburger();}); //создается новый гамбургер
                optionItemElement.addEventListener("click", this.changeInput);
            }
        }
    }

    order= (e)=>{
        let hamb=this.hamburger;
        alert(`Заказ принят!\n----------------------\nГамбургер: ${hamb.base}\nнаполнитель: ${hamb.fill}\nдоп.опция: ${hamb.adds?hamb.adds:" -"}\n----------------------\nЦена:${hamb.price}\nкалорийность: ${hamb.caloricValue}`);
    }

    changeInput(e) { //при нажатии на блок с рисуноком меняется input
        let input = document.querySelector(`input[value=${this.getAttribute("value")}]`);
        let inputBeforeChecked = input.checked;
        if (input.type == "radio") {
            input.checked = true;
        } else {
            if (e.target != input) {
                input.checked = !input.checked;
            }
        }
        if (input.checked != inputBeforeChecked) {
            this.dispatchEvent(new Event("change"));
        }
    }
}

class OptionItem{
    constructor(currrentOption) {
        this.type = currrentOption.type;
        this.name = currrentOption.name;
        this.fullname = currrentOption.fullname;
        this.price = currrentOption.price ;
        this.caloricValue = currrentOption.caloricValue ;
        this.checked = currrentOption.checked ;
    }

    getElement() { //отрисовка элемента с опцией гамбургера
        let element = document.createElement("div");
        element.classList.add("hamburger__element");
        element.setAttribute("value", `${this.name}`);
        element.insertAdjacentHTML("beforeend",`        
            <input
                class="${this.type}"
                type="${this.type == 'adds' ? 'checkbox' : 'radio'}" 
                name="${this.type}" ${this.checked ? 'checked' : ''}
                price="${this.price}"
                caloricValue="${this.caloricValue}"
                fullname="${this.fullname}"
                value="${this.name}">
            <img src="img/${this.name}.png" alt="${this.fullname}" value="${this.name}">
         
            <div class="hamburger__element-params">
                <span value="${this.name}">Цена: ${this.price}$</span>
                <span value="${this.name}">ККал: ${this.caloricValue}</span>
            </div>`);
        return element;
    }
}

class Hamburger{  //гамбургер
    constructor() {
        this.price = 0;
        this.caloricValue = 0;
        this.create();
    }

    create() { //расчет итоговых значений гамбургера и запись на страницу
        for (let currentInput of document.forms["hamb"].elements) {
            if (currentInput.checked){
                this[currentInput.name]=currentInput.getAttribute("fullname");
                this.price += +currentInput.getAttribute("price");
                this.caloricValue += +currentInput.getAttribute("caloricValue")
            }
        }
        document.querySelector("#totalCalories").innerHTML = this.caloricValue;
        document.querySelector("#totalPrice").innerHTML = this.price + "Р";
    }
}