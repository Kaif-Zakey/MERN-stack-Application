import React, { useEffect, useState} from "react"
import { MdAdd } from "react-icons/md"
import Dialog from "../components/Dialog"
import type { Customer } from "../types/Customer"
import CustomersTable from "../components/tables/CustomersTable"
import CustomerForm from "../components/forms/CustomerForm"
import axios from 'axios';
import toast from "react-hot-toast";
import {CircleLoader} from "react-spinners";
import {addsCustomer, editCustomer, getAllCustomers, removeCustomer} from "../services/customerService.ts";
//import {customersData} from "../data/data.ts";
//import { customersData } from "../data/data"

/*const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};*/

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  height: "100vh", // Full height of the viewport
  width: "100vw", // Full width of the viewport
};


const CustomersPage: React.FC = () => {
  //const [customers, setCustomers] = useState<Customer[]>(customersData)


  const [loading,] = useState(true);
  const [color,] = useState("#000000");

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [isLoading, setIsloading] = useState<boolean>(false)

  const fetchAllCustomers = async () => {

    try {
      setIsloading(true)
      //const result = await axios.get<Customer[]>("http://localhost:3000/api/customers")
      //setCustomers(result.data)

        //service implementation - from customerService that centralized api calls in one place

        const result = await getAllCustomers()
        setCustomers(result)
        console.log(result)

    }catch (error){
      console.log(error)
      if (axios.isAxiosError(error)){
        toast.error(error.message)
      }else{
        toast.error("Error has encounted !")
      }
    }
    finally {
      setIsloading(false)
    }
  }

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const deleteCustomer = async (_id: string) => {
    try {
      /*await axios.delete(`http://localhost:3000/api/customers/${id}`, {
        headers: { "Content-Type": "application/json" }
      });*/
      //applying service to handle 📦delete  tasks now
      await removeCustomer(_id)
      setCustomers(prev => prev.filter(c => c._id !== _id)); // Optimistic update
      toast.success("Customer deleted successfully!");
      console.log(`Customer with ID ${_id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  /*const addCustomer = async (customerData: Omit<Customer, "id">) => {
    /!*const response = await axios.post(`http://localhost:3000/api/customers`, customerData, {
      headers: { "Content-Type": "application/json" }
    })*!/
    //return response.data

      //applying service to handle ➕add customer tasks

      await addsCustomer(customerData)
  }*/

  /*const updateCustomer = async (id:number, customerData : Omit<Customer, "id">) =>{
    /!*const response = await axios.put(`http://localhost:3000/api/customers/${id}`, customerData, {
      headers: { "Content-Type": "application/json" }
    })
    return response.data*!/

      //applying service to handle ♻update customer tasks

      await editCustomer(id,customerData)
  }*/

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const handleAddCustomer = () => {
    setSelectedCustomer(null)
    setIsAddDialogOpen(true)
  }

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsEditDialogOpen(true)
  }

  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsDeleteDialogOpen(true)
  }

  const handleFormSubmit = async (customerData: Omit<Customer, "_id">) => {
    if (selectedCustomer) {
      // Update existing customer
      try {
          //calls service to update customer
        const updatedCustomer = await editCustomer(selectedCustomer._id, customerData);
        setCustomers(prev => prev ? prev.map(customer =>
            customer._id === selectedCustomer._id ? updatedCustomer : customer
        ) : []); // Optimistic update
        setIsEditDialogOpen(false);
        toast.success("Customer updated successfully!");
        console.log("Customer updated:", updatedCustomer);
      } catch (error) {
        console.error("Error updating customer:", error);
      }



    } else {
      try {
        // Add new customer
          // calls service to add customer
        const newCustomer = await addsCustomer(customerData)
        //const newCustomer = { ...customerData, id: Date.now() }
        setCustomers((prev) => [...prev, newCustomer])
        setIsAddDialogOpen(false)
        toast.success("Customer added successfully!");
        console.log("Customer added:", newCustomer)
      }catch (error){
        if (axios.isAxiosError(error)){
          toast.error(error.message)
        }else{
          toast.error("Error has encounted !")
        }
      }
    }
    setSelectedCustomer(null)
  }

  const confirmDelete =async () => {
    if (selectedCustomer) {
      //setCustomers((prev) => prev.filter((customer) => customer.id !== selectedCustomer.id))
      try {
        await deleteCustomer(selectedCustomer._id)
        //fetch customers after delete
        //fetchAllCustomers()
      }catch (error){
        if (axios.isAxiosError(error)){
          toast.error(error.message)
        }else{
          toast.error("Error has encounted !")
        }
      }finally {
        setIsDeleteDialogOpen(false)
        setSelectedCustomer(null)
      }
    }
  }

  const cancelDialog = () => {
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
    setIsDeleteDialogOpen(false)
    setSelectedCustomer(null)
  }



  /*if (isLoading) return <CircleLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
  />*/

  if (isLoading)
    return (
        <div style={override}>
          <CircleLoader color={color} loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    );


  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-gray-800'>Customers</h1>
          <button
            onClick={handleAddCustomer}
            className='flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150'
          >
            <MdAdd className='w-5 h-5' />
            <span>Add Customer</span>
          </button>
        </div>

        {/* Customers Table */}
        <CustomersTable customers={customers} onEdit={handleEditCustomer} onDelete={handleDeleteCustomer} />



        {/* Add Customer Dialog */}
        <Dialog
          isOpen={isAddDialogOpen}
          onCancel={cancelDialog}
          onConfirm={() => {
            // This will be handled by the form submission
            const form = document.querySelector("form") as HTMLFormElement
            if (form) {
              form.requestSubmit()
            }
          }}
          title='Add New Customer'
        >
          <CustomerForm onSubmit={handleFormSubmit} />
        </Dialog>

        {/* Edit Customer Dialog */}
        <Dialog
          isOpen={isEditDialogOpen}
          onCancel={cancelDialog}
          onConfirm={() => {
            const form = document.querySelector("form") as HTMLFormElement
            if (form) {
              form.requestSubmit()
            }
          }}
          title='Edit Customer'
        >
          <CustomerForm customer={selectedCustomer} onSubmit={handleFormSubmit} />
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog isOpen={isDeleteDialogOpen} onCancel={cancelDialog} onConfirm={confirmDelete} title='Delete Customer'>
          <p className='text-gray-700'>
            Are you sure you want to delete <strong>{selectedCustomer?.name}</strong>? This action cannot be undone.
          </p>
        </Dialog>
      </div>
    </div>
  )
}

export default CustomersPage
