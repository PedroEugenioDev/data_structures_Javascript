const inquirer = require('@inquirer/prompts');

class Stack {
  constructor(value = null) {
      this.value = value; 
      this.next = null;
  }
}

let top = null
let aux = null

async function main(){
    let option
    do {
        console.clear()
        option = await inquirer.select({
            message: 'Choose an option:',
            choices: [
              {
                name: 'Push',
                value: '1',
              },
              {
                name: 'Pop',
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
                const valueToPush = await inquirer.input({ message: "Value: "})
                let newElement = new Stack(valueToPush)
                newElement.next = top
                top = newElement
                break;
            case '2':
                console.clear()
                if (top === null) {
                    await inquirer.input({message: "Empty stack"})
                } else {
                    await inquirer.input({message: `Removing: ${top.value}`})
                    top = top.next
                }
                break;
            case '3':
                console.clear();
                if (top === null) {
                    await inquirer.input({message: "Empty stack"})
                } else {
                    await inquirer.input({message: `Top: ${top.value}`})
                }
                break;
            case '4':
                console.clear();
                if(top===null){
                    await inquirer.input({message: "Empty stack"})
                }else{
                    aux = top
                    let size = 0
                    while(aux!==null){
                        aux = aux.next
                        size++
                    }
                    await inquirer.input({message: `Stack size: ${size}`})
                }
                break;
            case '5':
                console.clear();
                top = null
                await inquirer.input({message: "Empty List"})
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