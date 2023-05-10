import React, { useState, useEffect, useCallback } from "react";
import { AuthContext } from "../authContext";
import ListCard from "../components/listCard";
import { useNavigate } from "react-router";
import MkdSDK from "../utils/MkdSDK";

const AdminDashboardPage = () => {

  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const getData = async () => {
    try {
      let sdk = new MkdSDK();
      const response = await sdk.getData(currentPage, itemsPerPage)
      setData(response.list)
      setCurrentPage(response.page)
      setTotalItems(response.total)
      setTotalPages(response.num_pages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [currentPage])

  const moveListItem = useCallback(
    (dragIndex, hoverIndex) => {
        const dragItem = data[dragIndex]
        const hoverItem = data[hoverIndex]
        setData(items => {
            const updatedData = [...data]
            updatedData[dragIndex] = hoverItem
            updatedData[hoverIndex] = dragItem
            return updatedData
        })
    },
  [data],
)

  const { dispatch } = React.useContext(AuthContext)
  const navigate = useNavigate()

  const Logout = () => {
    const role = localStorage.getItem('role')
    dispatch({
      type: "LOGOUT"
    })
    navigate(`/${role}/login`)
  }

  const prevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(page => page - 1)
    }
  }

  const nextPage = () => {
    if(currentPage < totalPages) {
      setCurrentPage(page => page + 1)
    }
  }

  const listItems = data.map((item, index) => <ListCard index={index} moveListItem={moveListItem} item={item} key={item.id} />)

  return (
    <>
      <div className="bg-[#111111] h-[100vh] overflow-y-auto font-body">
        
        <nav>
          <div className="flex justify-between items-center py-4 w-[90%] mx-auto">
            <div><h1 className="font-bold text-white text-[40px]">APP</h1></div>
            <div><button onClick={() => Logout()} className="bg-[#9BFF00] py-[5px] px-4 rounded-full font-light">Logout</button></div>
          </div>
        </nav>

        <section className="my-10">
          <div className="w-[90%] mx-auto text-white">
            <div className="flex justify-between items-center">
              <div><h3 className="text-[30px] font-thin">Today's leaderboard</h3></div>
              <div className="flex justify-between font-thin bg-[#1D1D1D] py-2 px-4 rounded-md">
                <div><p>30 May 2022</p></div>
                <div className="bg-[#9BFF00] text-black rounded-md px-2 mx-4 font-light"><p>SUBMISSIONS OPEN</p></div>
                <div><p>11:34</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-5">
          <div className="w-[90%] mx-auto text-white">
            
            <div className="flex justify-between items-center font-thin text-[15px]">
              <div className="flex items-center justify-start basis-1/3"><p>#</p><p className="ml-5">Title</p></div>
              <div className="basis-1/3 flex justify-center"><p>Author</p></div>
              <div className="basis-1/3 flex justify-end"><p>Most liked</p></div>
            </div>
            
            <div className="mt-5">
              { listItems }
            </div>
          </div>
        </section>

        <section className="my-5">
          <div className="w-[90%] mx-auto text-black">
            <div className="flex justify-center items-center">
              <div>
                <button onClick={prevPage} className="bg-[#9BFF00] py-[5px] px-4 rounded-full font-light">Prev</button>
              </div>
              <div className="ml-2">
                <button onClick={nextPage} className="bg-[#9BFF00] py-[5px] px-4 rounded-full font-light">Next</button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default AdminDashboardPage;
