const inquirer = require('@inquirer/prompts');

const max_size = 10
let maxHeap = new Array(max_size+1)
let size = 0
let index

function parent(child) {
    return Math.floor( child/2 )
}

function heapify(ind, size) {
    let left_child, right_child, aux, biggest
    biggest = ind
    if( ((2*ind)+1) <= size){
        left_child = (2*ind)+1
        right_child = (2*ind)
        if ((maxHeap[left_child] >= maxHeap[right_child]) && (maxHeap[left_child] > maxHeap[index])) {
            biggest = ( (2*ind) +1)
        } else if( (maxHeap[right_child] > maxHeap[left_child]) && (maxHeap[right_child] > maxHeap[index])){
            biggest = ( 2*ind )
        }
    }else if( ((2*ind)+1) <= size){
        right_child = (2*ind)
        if (maxHeap[right_child] > maxHeap[ind]) {
            biggest = ( 2*ind )
        }
    }

    if(biggest !== ind){
        aux = maxHeap[ind]
        maxHeap[ind] = maxHeap[biggest]
        maxHeap[biggest] = aux
        heapify(biggest, size)
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
                name: 'Insert at heap',
                value: '1',
              },
              {
                name: 'Consult peek',
                value: '2',
              },
              {
                name: 'Remove from heap',
                value: '3',
              },
              {
                name: 'Consult heap',
                value: '4',
              },
              {
                name: 'Exit',
                value: '5',
              },
            ],
          });
        switch (option) {
            case '1':
                console.clear()
                if(size < max_size){
                    const valueToInsert = await inquirer.input({ message: "Value: "})
                    size++
                    index = size
                    while( (index > 1) && ( maxHeap[parent(index)] < valueToInsert) ){
                        maxHeap[index] = maxHeap[parent(index)]
                        index = parent(index)
                    }
                    maxHeap[index] = valueToInsert
                }else{
                    await inquirer.input({message: "Heap full"})
                }
                break;
            case '2':
                console.clear()
                if (size === 0) {
                    await inquirer.input({message: "Empty heap"})
                } else {
                    await inquirer.input({message: `Peek: ${maxHeap[1]}`})
                }
                break;
            case '3':
                console.clear();
                if (size === 0) {
                    await inquirer.input({message: "Empty heap"})
                } else {
                    let root = maxHeap[1]
                    maxHeap[1] = maxHeap[size]
                    size--
                    heapify(1, size)
                    await inquirer.input({message: `Removed: ${root}`})
                }
                break;
            case '4':
                console.clear()
                if (size === 0) {
                    await inquirer.input({message: "Empty heap"})
                } else {
                    process.stdout.write(`Heap: `)
                    for (let i = 1; i <= size; i++) {
                        process.stdout.write(` ${maxHeap[i]}`)
                    }
                    process.stdout.write("\n")
                    await inquirer.input({ message: "Press any key to continue..."})
                }
                break;
            case '5':
                console.log("Exiting...")
                break;     
            default:
                console.log("invalid option!")
        }    
    } while (option !== '5');
}

main()