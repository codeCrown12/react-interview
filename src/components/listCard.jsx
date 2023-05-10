
export default function ListCard({ item }) {

    return (
        <>
            <div className="border-[1px] py-4 px-3 border-[#707070] rounded-md flex flex-row justify-between items-center mb-4">
                
                <div className="font-thin flex items-center justify-start basis-1/3">
                  <p className="mr-5">{ `${item.id < 10 ? '0'+item.id : item.id}` }</p>
                  <img className="w-[120px] h-[60px] object-cover rounded-md"
                  src={item.photo}></img>
                  <p className="ml-3">{ item.title }</p>
                </div>

                <div className="font-thin flex items-center justify-center basis-1/3">
                  <img className="w-[30px] h-[30px] object-cover rounded-full"
                  src={item.photo}></img>
                  <p className="text-[#9BFF00] ml-2">{item.username}</p>
                </div>

                <div className="basis-1/3 flex justify-end">
                  <p>{item.like}</p>
                </div>

            </div>
        </>
    )

}