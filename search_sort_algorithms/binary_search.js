function binary_search(arr, value) {
    console.log(`Searching for ${value} at ${arr}`)
    let beginning = 0
    let ending = arr.length-1
    let middle = Math.floor((beginning+ending)/2) 
    let found = false
    while((beginning<=ending) && (found === false)){
        if(value===arr[middle]){
            found = true
        }else{
            if(arr[middle]>value){
                ending = middle-1
            }else{
                beginning = middle+1
            }
            middle = Math.floor((beginning+ending)/2)
        }
    }
    if(found){
        return `Value found at index ${middle}`
    }else{
        return `Value not found`
    }
}

data = [1,2,3,4,4,6,6,7,8,9]
result = binary_search(data,5)
console.log(result)