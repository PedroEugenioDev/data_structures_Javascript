function linear_search(arr, value) {
    console.log(`Searching for ${value} at ${arr}`)
    let found = false
    let i = 0
    while((found === false) && (i<arr.length)){
        if(arr[i]===value){
            found=true
        }else{
            i++
        }
    }
    if(found){
        return `Value found at index ${i}`
    }else{
        return `Value not found`
    }
}

data = [8,4,6,2,9,2,1,4,7,3]
result = linear_search(data, 3)
console.log(result)