exports.formatDate = ()=>{
    return new Date().toISOString().split('T')[0]
}
