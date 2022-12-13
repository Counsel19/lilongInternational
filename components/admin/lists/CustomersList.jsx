import Image from "next/image";
import { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../../context/AppContext";
import Pagination from "../../Pagination";
import EntriesFilter from "../EntriesFilter";
import { FormRow, SearchContainer } from "../Search";

const CustomersList = () => {
  const {
    search,
    user,
    allUsers,
    getAllUsers,
    isLoading,
    page,
    limit,
    handleInputChange,
  } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getAllUsers();
    };

    getData();
  }, [search, user, page, limit]);

  const handleSearch = (e) => {
    if (isLoading) return;
    let name = e.target.name;
    let value = e.target.value;
    handleInputChange(name, value);
  };

  return (
    <div className="mt-6 overflow-x-auto relative ">
      <h1 className="text-xl font-bold text-gray-600 mb-5">Customers</h1>
      <div className="bg-white flex flex-col md:flex-row items-center gap-6 justify-between py-4 px-4 mb-4">
        <FormRow
          type="search"
          name="search"
          isCustomerSearch={true}
          placeholder="Search for customer"
          value={search}
          handleChange={handleSearch}
        />
       {allUsers &&  <EntriesFilter total={allUsers.totalUsers} /> }
      </div>
      {allUsers ? (
        <div className="my-4 shadow-md sm:rounded-lg px-4 bg-white py-8 overflow-x-auto relative ">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-sm text-blue-700 uppercase bg-gray-100">
              <tr className="whitespace-nowrap">
                <th scope="col" className="py-4 px-2">
                  Avatar
                </th>
                <th scope="col" className="py-4 px-2">
                  First Name
                </th>
                <th scope="col" className="py-4 px-2">
                  Last Name
                </th>
                <th scope="col" className="py-4 px-2">
                  Email
                </th>
                <th scope="col" className="py-4 px-2">
                  phone
                </th>

                <th scope="col" className="py-4 px-2">
                  Country
                </th>
                <th scope="col" className="py-4 px-2">
                  state
                </th>

                <th scope="col" className="py-4 px-2">
                  Delivery Address
                </th>
                <th scope="col" className="py-4 px-2">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {allUsers.users.length > 0 ? (
                allUsers.users.map((item) => (
                  <tr key={item._id} className="bg-white border-b">
                    <td className="py-2 px-2">
                      <Image
                        src="/images/smile.png"
                        alt="Avater"
                        height={30}
                        width={30}
                      />
                    </td>

                    <td className="py-2 px-2">{item.firstname}</td>
                    <td className="py-2 px-2">{item.lastname}</td>
                    <td className="py-2 px-2">{item.email}</td>
                    <td className="py-2 px-2">{item.phone}</td>
                    <td className="py-2 px-2">{item.country}</td>
                    <td className="py-2 px-2">{item.state}</td>
                    <td className="py-2 px-2">{item.deliveryAddress}</td>
                    <td className="py-2 px-2 flex ">
                      <span className="mr-2 font-medium bg-rose-600 flex items-center text-white p-1 rounded hover:cursor-pointer">
                        <MdDeleteOutline size={18} />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-2 font-bold text-xl ">
                    No Customer to Display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-end">
            {allUsers.numOfPages > 1 && (
              <Pagination numOfPages={allUsers.numOfPages} />
            )}
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <TailSpin />
        </div>
      )}
    </div>
  );
};

export default CustomersList;
