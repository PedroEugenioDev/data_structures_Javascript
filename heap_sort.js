function heap_sort(arr){
    build_heap(arr)
    sort(arr)
}

function build_heap(arr){
    let i = Math.floor(arr.length/2)
    for(i; i >= 1; i--) {
        heapify(arr, i, arr.length-1)
    }
}

function heapify(arr, current, size){
    let biggest = current
    let left = current*2
    let right = (current*2)+1

    if(right<=size){
        if((arr[right]>=arr[left]) && (arr[right]>arr[current])){
            biggest = right
        }else if(arr[left]>arr[right] && arr[left]>arr[current]){
            biggest = left
        }
    }else if(left <= size){
        if(arr[left]>arr[current]){
            biggest = left
        }
    }

    if(biggest!=current){
        let aux = arr[current]
        arr[current] = arr[biggest]
        arr[biggest] = aux
        console.log(`Heaped ${arr}`)
        heapify(arr, biggest, size)
    }
}

function sort(arr){
    let size = arr.length
    let latest = size-1
    for(let i = (arr.length-1); i >= 1; i--) {
        console.log(`Sorting ${arr}`)
        let aux = arr[1]
        arr[1] = arr[latest]
        arr[latest] = aux
        latest--
        heapify(arr, 1, latest)
    }
}

data = [,8,3,9,5,1,3,4,8,1,5,2]
console.log(`Ordenando ${data}`)
heap_sort(data)
console.log(`Ordenado: ${data}`)