const isExpiringSoon = (expirationDate?: string) => {
    if (!expirationDate) return false
    const today = new Date()
    const expDate = new Date(expirationDate)
    const diffTime = expDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays >= 0
}

const isExpired = (expirationDate?: string) => {
    if (!expirationDate) return false
    const today = new Date()
    const expDate = new Date(expirationDate)
    return expDate < today
}

export { isExpiringSoon, isExpired }