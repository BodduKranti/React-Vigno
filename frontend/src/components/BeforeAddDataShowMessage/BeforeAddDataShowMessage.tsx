import { useNavigate } from "react-router"
import Button from "../field/Button"

interface BeforeAddDataShowMessageprops {
    pageIcon: any,
    heading: string,
    description: string,
    url?: string,
    sectionBtntx: string,
    sectionBtncolor?: 'success' | 'warning' | 'danger' | 'info',

}
const BeforeAddDataShowMessage = ({
    pageIcon,
    heading,
    description,
    url,
    sectionBtntx: btnText,
    sectionBtncolor: btnColors
}: BeforeAddDataShowMessageprops) => {
    const navigate: any = useNavigate()
    return (
        <main className="flex-1 flex items-center justify-center px-5 py-12">
            <section className="w-full max-w-xl text-center">
                <div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-full bg-orange-100">

                    {pageIcon}
                </div>

                <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-5xl">
                    {heading}
                </h1>

                <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
                    {description}
                </p>

                {
                    btnText !== '' &&
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                        <Button
                            btnTxt={btnText}
                            onClick={() => navigate(url)}
                            type="button"
                            btnColor={btnColors}
                        />
                        {/* <button
                            onClick={() => navigate('/role/owner/addshop')}
                            className="inline-flex items-center justify-center gap-2 rounded-xl
                         bg-orange-500 px-6 py-3 font-semibold text-white shadow-md shadow-orange-200 
                         transition hover:bg-orange-600"
                        >
                            {btnText}
                        </button> */}
                    </div>
                }



                {/* <p className="mt-10 text-sm text-gray-500">
                    Need help?{" "}
                    <a
                        href="mailto:support@quickbite.com"
                        className="font-semibold text-orange-600 hover:underline"
                    >
                        Contact QuickBite Support
                    </a>
                </p> */}
            </section>
        </main>
    )
}

export default BeforeAddDataShowMessage