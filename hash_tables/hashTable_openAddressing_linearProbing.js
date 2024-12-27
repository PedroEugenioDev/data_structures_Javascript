const inquirer = require('@inquirer/prompts');

class Hash {
    constructor(){
        this.key = null
        this.status = "free"
    }
}

const size = 8
const hashTable = Array(size).fill(null).map(() => new Hash());

async function insert(pos, value) {
    let i = 0
    while((i < size) && (hashTable[pos+i].status !== "free") && (hashTable[pos+i].status !== "removed")){
        i++
    }
    if (i<size) {
        hashTable[pos+i].key = value
        hashTable[pos+i].status = "filled"
    } else {
        await inquirer.input({message: "Table filled"})
    }
}

async function remove(value) {
    pos = search(value)
    if (pos<size) {
        hashTable[pos].key = null
        hashTable[pos].status = "removed"
    } else {
        await inquirer.input({message: "Value not found"})
    }
}

function search(value) {
    let i = 0
    const pos = hashing(value) 
    while((i < size) && (hashTable[pos+i].status !== "free") && (hashTable[pos+i].key !== value)){
        i++
    }
    if ((hashTable[(pos+i)%size].key = value) && (hashTable[(pos+i)%size].status = "free")) {
        return ((pos+i)%size)
    } else {
        return size
    }
}

function hashing(value) {
    return value%size
}

async function printTable() {
    console.log(hashTable)
    await inquirer.input({message: "Continue"})
}

async function main(){
    let option
    do {
        console.clear()
        option = await inquirer.select({
            message: 'Choose an option:',
            choices: [
              {
                name: 'Insert at table',
                value: '1',
              },
              {
                name: 'Consult table',
                value: '2',
              },
              {
                name: 'Remove from table',
                value: '3',
              },
              {
                name: 'Exit',
                value: '4',
              },
            ],
          });
        switch (option) {
            case '1':
                console.clear()
                const valueToInsert =   await inquirer.input({message: "Value: "})
                const pos = hashing(valueToInsert)
                await insert(pos, valueToInsert)
                break;
            case '2':
                console.clear()
                await printTable()
                break;
            case '3':
                console.clear();
                const valueToRemove = await inquirer.input({message: "Value to remove: "})
                await remove(valueToRemove)
                break;
            case '4':
                console.log("Exiting...")
                break;     
            default:
                console.log("invalid option!")
        }    
    } while (option !== '4');
}

main()