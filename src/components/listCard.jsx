import React, { useRef } from "react"
import { useDrag, useDrop } from 'react-dnd' 

export default function ListCard({ item, moveListItem }) {

    const [{ isDragging }, dragRef] = useDrag({
        type: 'card',
        item: item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const [spec, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveListItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    return (
        <>
            <div ref={dragDropRef} className="border-[1px] py-4 px-3 border-[#707070] rounded-md flex flex-row justify-between items-center mb-4">
                
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