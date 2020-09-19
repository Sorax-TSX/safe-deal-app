export const getVariant = (status) => {
    switch (status) {
        case 'Confirmation':
            return 'info'
        case 'Awaiting payment':
            return 'warning'
        case 'Paid up':
            return 'primary'
        case 'Completed':
            return 'success'
        case 'Canceled':
            return 'danger'
        default:
            return null
    }
}