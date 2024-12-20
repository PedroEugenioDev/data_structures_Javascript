function linear_search(arr, value) {
    console.log(`Searching for ${value} at ${arr}`)
    let found = false
    let i = 0
    while((found === false) && (i<arr.length) && (arr[i]<=value)){
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

data = [1,3,4,5,7,8,9]
result = linear_search(data, 6)
console.log(result)