function split_sorted(arr, beginning, endind) {
    let pivot = arr[Math.floor((beginning+endind)/2)]
    let i = beginning-1
    let j = endind+1
    while(i<j){
        do {
            j--
        }while(arr[j]>pivot);
        do {
            i++
        }while(arr[i]<pivot);
        if(i<j){
            let aux = arr[j]
            arr[j] = arr[i]
            arr[i] = aux
        }
    }
    return j
}

function quick_sort(arr, beginning, ending){
    if(beginning<ending){
        let middle = split_sorted(arr, beginning, ending)
        quick_sort(arr, beginning, middle)
        quick_sort(arr, (middle+1), ending)
    }
}

data = [9,8,8,7,6,6,6,5,4,3,2,2,2,1]
console.log(`Ordenando ${data}`)
quick_sort(data, 0, (data.length-1))
console.log(`Ordenado: ${data}`)