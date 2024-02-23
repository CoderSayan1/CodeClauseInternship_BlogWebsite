import CardSection from "@/components/CardSection";

// @ts-ignore
export default function Blog({searchParams}){
    const page = parseInt(searchParams.page) || 1;
    const {cat} = searchParams;
    return(
        <div className="w-3/4 mx-auto my-14">
            <h1 className="text-center font-bold text-2xl mb-4 bg-orange-300 rounded-lg capitalize">{cat}  blog</h1>
            <div>
                <CardSection page={page} cat={cat}/>
            </div>
        </div>
    )
}