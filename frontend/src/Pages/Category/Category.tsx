import { useParams } from 'react-router'
import { useAppDispatch } from '../../Store/hook'
import { useEffect } from 'react'
import { cateItemsThunkcontroler } from '../../Store/StoreThunk/GetshopThunk'

const Category = () => {
    const { cat } = useParams<{ cat: any }>()
    console.log('cat', cat)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(cateItemsThunkcontroler(cat))
    }, [])


    return (
        <div>Category</div>
    )
}

export default Category