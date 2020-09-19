const getNextStep = (current) => {
    switch (current) {
        case 'Confirmation':
            return 'Awaiting payment'
        case 'Awaiting payment':
            return 'Paid up'
        case 'Paid up':
            return 'Completed'
        default:
            return null;
    }
}

module.exports = {
    getNextStep
}
