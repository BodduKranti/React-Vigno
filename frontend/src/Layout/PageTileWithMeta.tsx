

//page componet [home,about]
// page name [Home,Restaturant]
// Meta description

import { useEffect, type ComponentType } from "react"

const PageTitleWithMetaDetails = <P extends Object>(WraperComponent: ComponentType, pageTitle: string, metaDesc: string) => {
    return function mainLayout(props: P) {
        useEffect(() => {
            document.title = `QuickBite - ${pageTitle}`

            //  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            //let metaDescript
            let metaDescription = document.querySelector<HTMLMetaElement>(`meta[name='description']`)
            if (!metaDescription) {
                metaDescription = document.createElement('meta')
                metaDescription.name = 'description'
                document.head.appendChild(metaDescription)
            }

            metaDescription.content = metaDesc

        }, [])

        return <WraperComponent {...props} />
    }
}
export default PageTitleWithMetaDetails