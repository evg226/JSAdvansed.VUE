import inputItem from "./callbackitem"

// Вставлен блок из урока по ООП (для VUE он не переделывался)
// С применением ООП
//Код не самый идеальный, т.к сделан в начале курса JavaScript level 2
export default class PageCallBack {
    constructor(container = ".page__content",query,errorBox) {
        this.formElement = this.getFormElement(container);
        this.inputs = [];
        this._load();
        this.render();
        this.queryServer=query;
        this.errorBox=errorBox;
    }
    _load() {
        this.inputs = [
            { type: "text", name:"userName", label:"Ваше Имя", placeholder:"Ваше Имя", pattern:["^[a-zа-я ]+$","i"]},
            { type: "tel", name:"phone", label: "Телефон", placeholder: "+7(000)000-00-00", pattern:["^\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$"]}, 
            { type: "text", name:"userEmail", label:"email", placeholder:"box@domain.com",pattern:["^([a-z0-9]+[.-])*[a-z0-9]+@([a-z0-9]+[.-])*[a-z0-9]+[.][a-z]{2,6}$"]},
            { type: "textarea",name:"message", label:"Ваше сообщение", placeholder:"Введите сообщение",pattern:[".+"]},
            { type: "submit",name:"button", label:"",placeholder:"" },
        ];
    }
    render() {
        for (let item of this.inputs) {
            let itemEl = new inputItem(item).render();
            this.formElement.insertAdjacentHTML("beforeend", itemEl);
        }
        this.formElement.addEventListener("submit", this.checkInputs);
        this.formElement["phone"].addEventListener("keyup", this._phoneCheck);
    }
    getFormElement(container) {
        let resultEl = document.createElement("form");
        resultEl.classList.add("callback__form");
        resultEl.action = "#";
        resultEl.method = "GET";
        resultEl.name = "callBack";
        document.querySelector(container).append(resultEl);
        return resultEl;
    }
    checkInputs = (e) => {
        e.preventDefault();
        let checked = true;
        let message={};
        for (let inputEl of e.target) {
            inputEl.value = inputEl.value.trim();
            let pattern = this.inputs.find(item => item.name == inputEl.name).pattern;
            if (!pattern) continue;
            pattern = new RegExp(pattern[0], pattern[1]);
            if (!pattern.test(inputEl.value)) {
                inputEl.style.boxShadow = "0 0 10px red";
                checked = false;
            } else {
                inputEl.style.boxShadow = "none";
                message[inputEl.name]=inputEl.value;
            }
        }
        if (checked) this._sendCallback(message);
    }
   _phoneCheck = (e) => {
        let val = e.target.value.replace(/\+7|\D/g, '').substr(0, 10);
        let result = "";
        for (let i in val) {
            result += val[i];
            if (i == 2) result += ")";
            if (i == 5) result += "-";
            if (i == 7) result += "-";
        }
        e.target.value = "+7(" + result;;
    }

    _sendCallback(message){
        this.queryServer("/sendCallBack", message)
            .then(data => {
                if (data.result == 1) {
                    document.forms.callBack.reset();
                    alert("Сообщение доставлено!");
                } else {
                    this.errorBox.push(`Ошибка при отправке сообщения ${message.message} пользователя ${message.userName}`);
                }
            });
    }
}
