const inquirer = require('@inquirer/prompts');

const max_size = 10
let minMaxHeap = new Array(max_size+1)
let maxPos
let size = 0

function isMinLevel(node) {
    let level = Math.floor(Math.log(node)/Math.log(2)) + 1
    if((level%2) === 0){
        return false
    }else{
        return true
    }
}

function insertMinMax(value, index){
        minMaxHeap[index] = value
        heapifyUp(index)
}

function heapifyUp(index){
    let parent = Math.floor( index/2 )
    if (isMinLevel(index)) {
        if (parent>=1) {
            if (minMaxHeap[index]>minMaxHeap[parent]) {
                swap(index, parent)
                heapifyUpMax(parent)
            } else {
                heapifyUpMin(index)
            }
        }
    }else{
        if (parent>=1) {
            if (minMaxHeap[index]<minMaxHeap[parent]) {
                swap(index, parent)
                heapifyUpMin(parent)
            } else {
                heapifyUpMax(index)
            }
        }
    }
}

function heapifyUpMin(index) {
    let grandparent = Math.floor(index/4)
    if ((grandparent >= 1) && (minMaxHeap[index] < minMaxHeap[grandparent])) {
        swap(index, grandparent)
        heapifyUpMin(grandparent)
    } 
}

function heapifyUpMax(index) {
    let grandparent = Math.floor(index/4)
    if ((grandparent >= 1 ) && (minMaxHeap[index]>minMaxHeap[grandparent])) {
        swap(index, grandparent)
        heapifyUpMax(grandparent)
    }
}


function heapifyDown(index){
    if (isMinLevel(index)) {
        heapifyDownMin(index)
    } else {
        heapifyDownMax(index)
    }
}

function heapifyDownMin(index) {
    if ((index*2) <= size) {
        let smaller = getSmallerChild(index)
        if (minMaxHeap[index] > minMaxHeap[smaller]) {
            swap(index, smaller)
            if (smaller >= (index*4)) {
                let parent = Math.floor(smaller/2)
                if (minMaxHeap[parent]<minMaxHeap[smaller]) {
                    swap(parent, smaller)
                }
                heapifyDownMin(smaller)
            }
        } 
    }
}

function getSmallerChild(parent) {
    let smaller = 0
    if ((parent*2) <= size) {
        smaller = (parent*2)
        if (minMaxHeap[smaller+1] < minMaxHeap[smaller] ) {
            smaller=smaller+1
        }
        for (let k = (parent*4); (k <= ((parent*4)+3)) && (k<=size); k++) {
            if (minMaxHeap[k]<minMaxHeap[smaller]) {
                smaller=k
            }
        }
    }
    return smaller
}

function heapifyDownMax(index){
    if ((index*2)<=size) {
        let bigger = getBiggerChild(index)
        if (minMaxHeap[index] < minMaxHeap[bigger]) {
            swap(index, bigger)
            if (bigger >= (4*index)) {
                let parent = Math.floor(bigger/2)
                if (minMaxHeap[parent] > minMaxHeap[bigger]) {
                    swap(parent, bigger)
                }
                heapifyDownMax(bigger)
            }
        }
    }
}

function getBiggerChild(parent) {
    let bigger = 0
    if ((parent*2) <= size) {
        bigger = parent*2
        if (minMaxHeap[bigger+1] > minMaxHeap[bigger]) {
            bigger = bigger+1
            for (let k = (parent*4); (k < ((parent*4)+3)) && (k<=size); k++) {
                if (minMaxHeap[k]>minMaxHeap[bigger]) {
                    bigger=k
                }
            }
        }
    }
    return bigger
}

function highestPriority() {
    if (size === 1) {
        return 1
    } else if ((size>2) && (minMaxHeap[3]>minMaxHeap[2])) {
        return 3
    } else {
        return 2
    }
}

async function printHeap() {
    if (size===0) {
        await inquirer.input({message: "Empty heap"})
    } else {
        process.stdout.write(`Heap: `)
        for (let j = 1; j <= size; j++) {
            process.stdout.write(` ${minMaxHeap[j]}`)
        }
        await inquirer.input({message: "\nContinue..."})
    }
}

function swap(one, other) {
    let aux = minMaxHeap[one]
    minMaxHeap[one] = minMaxHeap[other]
    minMaxHeap[other] = aux
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
                name: 'Consult min',
                value: '2',
              },
              {
                name: 'Consult max',
                value: '3',
              },
              {
                name: 'Remove min',
                value: '4',
              },
              {
                name: 'Remove max',
                value: '5',
              },
              {
                name: 'Consult heap',
                value: '6',
              },
              {
                name: 'Exit',
                value: '7',
              },
            ],
          });
        switch (option) {
            case '1':
                console.clear()
                if(size < max_size){
                    const valueToInsert = await inquirer.input({ message: "Value: "})
                    size++
                    insertMinMax(valueToInsert, size)
                }else{
                    await inquirer.input({message: "Heap full"})
                }
                break;
            case '2':
                console.clear()
                if (size === 0) {
                    await inquirer.input({message: "Empty heap"})
                } else {
                    await inquirer.input({message: `Min: ${minMaxHeap[1]}`})
                }
                break;
            case '3':
                console.clear()
                if (size === 0) {
                    await inquirer.input({message: "Empty heap"})
                } else {
                    maxPos = highestPriority()
                    await inquirer.input({message: `Peek: ${minMaxHeap[maxPos]}`})
                }
                break;
            case '4':
                console.clear();
                if (size === 0) {
                    await inquirer.input({message: "Empty heap"})
                }else {
                    let root = minMaxHeap[1]
                    minMaxHeap[1] = minMaxHeap[size]
                    size--
                    heapifyDown(1, size)
                    await inquirer.input({message: `Min removed: ${root}`})
                }
                break;
            case '5':
                console.clear()
                if (size === 0) {
                    await inquirer.input({message: "Empty heap"})
                } else if (size === 1) {
                    await inquirer.input({message: `Max removed: ${minMaxHeap[1]}`})
                    size = 0
                } else if (size === 2){
                    await inquirer.input({message: `Max removed: ${minMaxHeap[2]}`})
                    size = 1
                }else{
                    let max = 2
                    if(size >= 3){
                        if(minMaxHeap[3]>minMaxHeap[2]){
                            max = 3
                        }
                    }
                    let root = minMaxHeap[max]
                    await inquirer.input({message: `Max removed: ${root}`})
                    minMaxHeap[max] = minMaxHeap[size]
                    size--
                    heapifyDown(max)
                }
                break;
            case '6':
                await printHeap()
                break;
            case '7':
                console.log("Exiting...")
                break;     
            default:
                console.log("invalid option!")
        }    
    } while (option !== '7');
}

main()