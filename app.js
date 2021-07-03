// --------- MODAL --------- //
const Modal = {
    open(){
        document.querySelector('.modal-backdrop')
        .classList
        .add('active')
    },
    close() {
        document.querySelector('.modal-backdrop')
        .classList
        .remove('active')
    }
}

const Transaction = {
    all: [
        {
            description: 'Luz',
            amount: -50000,
            date: '21/03/2021'
        },
        {
            description: 'Site',
            amount: 500000,
            date: '21/03/2021'
        },
        {
            description: 'Internet',
            amount: -20000,
            date: '21/03/2021'
        },
        {
            description: 'App',
            amount: 200000,
            date: '21/03/2021'
        },
    ],

    add(transaction){
        Transaction.all.push(transaction)

        App.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1)
        
        App.reload();
    },

    incomes() {
        //somar as entradas
        let income = 0;
        Transaction.all.forEach(transaction =>{
            if ( transaction.amount > 0 ) {
                income += transaction.amount;
            }
        })

        return income;
    },
    expenses() {
        //somar as saídas
        let expense = 0;
        Transaction.all.forEach(transaction =>{
            if ( transaction.amount < 0 ) {
                expense += transaction.amount;
            }
        })

        return expense;
    },
    total() {
        //subtratir as saídas das entradas para ter o total
        let total = Transaction.incomes() + Transaction.expenses();

        return total
    }
}

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLtransaction(transaction)

        DOM.transactionContainer.appendChild(tr)
    },

    innerHTMLtransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
        
        const html = `
            <td>${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td>${transaction.date}</td>
            <td class="del-button">
                <ion-icon name="remove-circle-outline"></ion-icon>
            </td>
        `

        return html
    },

    updateBalance() {
        document
            .getElementById("incomeDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.incomes());
        
        document
            .getElementById("expenseDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.expenses());
        
            document
                .getElementById("totalDisplay")
                .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionContainer.innerHTML = "";
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
        
        return signal + value
    },
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues()
        console.log(Form.getValues())

        if( description.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === "" ) {
                throw new Error("Por favor, preencha todos os campos")
        }
    },

    submit(event) {
        event.preventDefault();

        try {
            Form.validateFields();
            
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {
        
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction);
        })

        DOM.updateBalance()
    },
    
    reload(){
        DOM.clearTransactions();
        App.init();
    }
}

App.init()