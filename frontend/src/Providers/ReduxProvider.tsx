import React from "react"
import { Provider } from 'react-redux'
import { MainStore } from "../Store/Store"

const ProviderRedux = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={MainStore}>{children}</Provider>
    )
}

export default ProviderRedux