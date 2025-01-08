const inquirer = require('@inquirer/prompts');

class Hash {
    constructor(value = null){
        this.value = value
        this.next = null
    }
}

const size = 8
const hashTable = Array(size).fill(null).map(() => new Hash());

function insert(value, index) {
    let newHash = new Hash(value)
    newHash.next = hashTable[index]
    hashTable[index] = newHash
}

function hashing(value) {
    return value%size
}

async function showTable() {
    hashTable.forEach((element, index) => {
        let aux = element
        process.stdout.write(`Key ${index}: `)
        while(aux !== null){
            process.stdout.write(`${aux.value} - ` )
            aux = aux.next
        }
        process.stdout.write("\n")
    })
    await inquirer.input({message: "Continue..."})
}

async function remove(value) {
    let key = hashing(value)
    let aux
    if(hashTable[key]!==null){
        if(hashTable[key].value === value){
            hashTable[key] =  hashTable[key].next
        }else{
            aux = hashTable[key].next
            let ant = hashTable[key]
            while ((aux !== null) && (aux.value !== value)) {
                ant = aux
                aux = aux.next
            }
            if(aux !== null){
                ant.next = aux.next
            }else{
                await inquirer.input({message: "Value not found. Continue..."})
            }
        }
    }else{
        await inquirer.input({message: "Value not found. Continue..."})
    }
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
                const key = hashing(valueToInsert)
                insert(valueToInsert, key)
                break;
            case '2':
                console.clear()
                await showTable()
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