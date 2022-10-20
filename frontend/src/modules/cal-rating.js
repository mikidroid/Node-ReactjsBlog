const calRating = (data) =>{
 //calculate rating function
   if(data.length > 0)
    {
    const _calRating = data.map(val=>val.value).reduce((a,b)=>a+b,0)
    const getPercent = _calRating/data.length
   return parseFloat(getPercent).toFixed(1)
    }
    else{
     return 0
    } 
}

module.exports = calRating