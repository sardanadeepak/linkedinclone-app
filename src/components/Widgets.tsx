import { BsFillInfoSquareFill } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
const Widgets = () => {
    const newsArticle = (heading: string, subtitle: string) => {
        return (
            <div className="flex p-2.5 cursor-pointer hover:bg-slate-100">
                <div className="mr-1 mt-0.5">
                    <RxDotFilled className="text-[#0a66c2]" />
                </div>
                <div className="flex flex-col flex-1">
                    <h4 className="text-sm">{heading}</h4>
                    <p className="text-xs text-gray-400">{subtitle}</p>
                </div>

            </div>
        )
    }
    return (
        <div className="flex flex-col sm:w-96 lg:flex-[0.25] lg:sticky lg:top-20 h-fit gap-2.5">
            <div className="flex justify-between p-2.5 items-start rounded-xl bg-white  ">
                <h2 className="text-xl font-medium">LinkedIn News</h2>
                <BsFillInfoSquareFill />

            </div>
            <div className="flex flex-col rounded-xl bg-white ">

                {newsArticle("Bitcoin hits $80K", "44m ago - 999 readers")}
                {newsArticle("Stocks power to best of week", "2h ago - 502 readers")}
                {newsArticle("Salesforce hiring 1,000 AI sellers", "7h ago - 15,000 readers")}
                {newsArticle("Voters across US rethink base  pay", "10h ago - 12,413 readers")}

            </div>

        </div >
    )
}

export default Widgets