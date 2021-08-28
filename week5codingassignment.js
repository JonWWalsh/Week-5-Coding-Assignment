class Demigod {
    constructor(name, power) {
        this.name = name;
        this.power = power;
    }
    describe() {
        return `${this.name} plays ${this.power}.`;
    }
}

class God {
    constructor(name) {
        this.name = name;
        this.demigods = [];
    }

    addDemigod(demigod) {
        if(demigod instanceof Demigod) {
            this.demigods.push(demigod);
        } else {
            throw new Error(`You can only add an instance of Demigod.  Argument is not a Demigod: ${demigod}`);
        }
    }

    describe() {
        return `${this.name} has ${this.demigods.length} demigods.`;
    }
}

class Menu {
    constructor() {
        this.gods = [];
        this.selectedGod = null;
    }
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createGod();
                    break;
                    case '2':
                        this.viewGod();
                        break;
                        case '3':
                            this.deleteGod();
                        break;
                    case '4':
                        this.displayGods();
                    break;
                default:
                    selection = 0;
                }
        selection = this.showMainMenuOptions();
    }

    alert("Fair well!  Keep that armor polished and come visit our world again soon!");
} 

showMainMenuOptions() {
    return prompt(`
    0) exit
    1) create new god
    2) view god
    3) delete god
    4) display all gods
    `);
}

showGodMenuOptions(godInfo) {
    return prompt(`
    0) back
    1) create demigod
    2) delete demigod
    ------------------
    ${godInfo}
    `);
}

    displayGods() {
        let godString = "";
        for (let i = 0; i < this.gods.length; i++) {
            godString += i + ') ' + this.gods[i].name + '\n';
        }
        alert(godString);
    }

    createGod() {
        let name = prompt("Enter name for new god:");
        this.gods.push(new God(name)); 
    }

    viewGod() {
        let godString = "";
        for (let i = 0; i < this.gods.length; i++) {
            godString += i + ') ' + this.gods[i].name + '\n';
        }
        let index = prompt(`Enter the index of the god you wish to view:
${godString}`);
        if (index > -1 && index < this.gods.length) { 
            this.selectedGod = this.gods[index]; 
            let description = 'God Name: ' + this.selectedGod.name + '\n';

            
            for (let i = 0; i < this.selectedGod.demigods.length; i++) {
                description += i + ') ' + this.selectedGod.demigods[i].name + ' - ' + this.selectedGod.demigods[i].power + '\n';
            }

            let selection = this.showGodMenuOptions(description);
            switch (selection) { 
            case '1':
                this.createDemigod();
                break;
            case '2':
                this.deleteDemigod();
            }
        }
    }

    deleteGod() {
        let index = prompt("Enter the god you wish to delete:");
        if (index > -1 && index < this.gods.length) {
            this.gods.splice(index, 1);
        }
    }

    createDemigod() {
        let name = prompt("Enter name for new demigod:");
        let power = prompt("Enter power for new demigod:");
        this.selectedGod.demigods.push(new Demigod(name, power));
    }

    deleteDemigod() {
        let index = prompt("Enter the index of the demigod you wish to delete:");
        if (index > -1 && index < this.selectedGod.demigods.length) {
            this.selectedGod.demigods.splice(index, 1);
        }
    }
}

let menu = new Menu();
alert("You are writing a novel based off of Greek Mythology.  First you must create the gods of this world.  Each god will then have demi-god children.\nNext, create the children for each god and assign the children their godly power.");
menu.start();
