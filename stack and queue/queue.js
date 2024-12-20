const inquirer = require('@inquirer/prompts');

class Queue {
  constructor(value = null) {
      this.value = value; 
      this.next = null;
  }
}

let front = null
let rear = null
let aux = null

async function main(){
    let option
    do {
        console.clear()
        option = await inquirer.select({
            message: 'Choose an option:',
            choices: [
              {
                name: 'Enqueue',
                value: '1',
              },
              {
                name: 'Dequeue',
                value: '2',
              },
              {
                name: 'Peek',
                value: '3',
              },
              {
                name: 'Size',
                value: '4',
              },
              {
                name: 'Clean',
                value: '5',
              },
              {
                name: 'Exit',
                value: '6',
              },
            ],
          });
        switch (option) {
            case '1':
                console.clear()
                const valueToEnqueue = await inquirer.input({ message: "Value: "})
                let newElement = new Queue(valueToEnqueue)
                if (front === null) {
                    front = newElement
                    rear = newElement
                } else {
                    rear.next = newElement
                    rear = newElement
                }
                break;
            case '2':
                console.clear()
                if (front === null) {
                    await inquirer.input({message: "Empty queue"})
                } else {
                    await inquirer.input({message: `Removing: ${front.value}`})
                    front = front.next
                }
                break;
            case '3':
                console.clear();
                if (front === null) {
                    await inquirer.input({message: "Empty queue"})
                } else {
                    await inquirer.input({message: `Front: ${front.value}`})
                }
                break;
            case '4':
                console.clear();
                if(front===null){
                    await inquirer.input({message: "Empty queue"})
                }else{
                    aux = front
                    let size = 0
                    while(aux!==null){
                        aux = aux.next
                        size++
                    }
                    await inquirer.input({message: `Queue size: ${size}`})
                }
                break;
            case '5':
                console.clear();
                front = null
                await inquirer.input({message: "Empty queue"})
                break;
            case '6':
                console.log("Exiting...")
                break;     
            default:
                console.log("invalid option!")
        }    
    } while (option !== '6');
}

main()