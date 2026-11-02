interface OwnerOrderCardItemsprops {
    items: any
}
const OwnerOrderCardItems = ({ items }: OwnerOrderCardItemsprops) => {
    console.log('items', items)
    return (
        <div>OwnerOrderCardItems</div>
    )
}

export default OwnerOrderCardItems