import React, {type CSSProperties, useEffect, useState} from "react"
import { MdAdd } from "react-icons/md"
import Dialog from "../components/Dialog"
import type { Item } from "../types/Item"
import ItemsTable from "../components/tables/ItemsTable"
import ItemForm from "../components/forms/ItemForm"
import axios from "axios";
import toast from "react-hot-toast";
import {CircleLoader} from "react-spinners";
import {addItem, editItem, getAllItems, removeItem} from "../services/itemService.ts";


//import type {Customer} from "../types/Customer.ts";
//import { itemsData } from "../data/data"


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const ItemsPage: React.FC = () => {
  //const [items, setItems] = useState<Item[]>(itemsData)

  const [loading,] = useState(true);
  const [color, ] = useState("#000000");

  const [items, setItems] = useState<Item[]>([]);

  const [isLoading, setIsloading] = useState<boolean>(false)

  const fetchAllItems = async () => {

    try {
      /*setIsloading(true)
      const result = await axios.get<Item[]>("http://localhost:3000/api/items")
      setItems(result.data)*/
      const result = await getAllItems()
      setItems(result)
    }catch (error){
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
    fetchAllItems()
  }, []);

  const deleteItem = async (_id: string) => {
    try {
      /*await axios.delete(`http://localhost:3000/api/customers/${id}`, {
        headers: { "Content-Type": "application/json" }
      });*/

      //applying service to handle 📦delete  tasks now
      await removeItem(_id)
      fetchAllItems()
      console.log(`Item with ID ${_id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  /*const addItem = async (itemData: Omit<Item, "_id">) => {
    const response = await axios.post(`http://localhost:3000/api/items`, itemData, {
      headers: { "Content-Type": "application/json" }
    })
    return response.data
  }

  const updateItem = async (_id: number, itemData: Omit<Item, "_id">) => {
    const response = await axios.put(`http://localhost:3000/api/items/${_id}`, itemData, {
      headers: { "Content-Type": "application/json" }
    })
    return response.data
  }*/

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const handleAddItem = () => {
    setSelectedItem(null)
    setIsAddDialogOpen(true)
  }

  const handleEditItem = (item: Item) => {
    setSelectedItem(item)
    setIsEditDialogOpen(true)
  }

  const handleDeleteItem = (item: Item) => {
    setSelectedItem(item)
    setIsDeleteDialogOpen(true)
  }

  const handleFormSubmit = async (itemData: Omit<Item, "_id">) => {
    if (selectedItem) {
      // Update existing item
      /*setItems((prev) =>
        prev.map((item) => (item.id === selectedItem.id ? { ...itemData, id: selectedItem.id } : item))
      )
      setIsEditDialogOpen(false)
      console.log("Item updated:", { ...itemData, id: selectedItem.id })*/

      try {
        //calls service to update customer
        const updatedItem = await editItem(selectedItem._id, itemData) // ✅ Await API call
        setItems(prev => prev ? prev.map(items =>
            items._id === selectedItem._id ? updatedItem : items
        ) : []);
        fetchAllItems()
        setIsEditDialogOpen(false)
        console.log("Customer updated:", updatedItem);
      } catch (error) {
        console.error("Error updating customer:", error);
      }

    } else {
      try {
        // Add new customer
        // calls service to add customer
        const newItems = await addItem(itemData)
        //const newCustomer = { ...customerData, id: Date.now() }
        setItems((prev) => [...prev, newItems])
        setIsAddDialogOpen(false)
        console.log("Item added:", newItems)
      }catch (error){
        if (axios.isAxiosError(error)){
          toast.error(error.message)
        }else{
          toast.error("Error has encounted !")
        }
      }
    }
    setSelectedItem(null)
  }

  const confirmDelete = async () => {
    if (selectedItem) {
      //setItems((prev) => prev.filter((item) => item.id !== selectedItem.id))
      try{
        await deleteItem(selectedItem._id)
        fetchAllItems()
      }catch (error){
        if (axios.isAxiosError(error)){
          toast.error(error.message)
        }else{
          toast.error("Error has encounted !")
        }
      }finally {
        setIsDeleteDialogOpen(false)
        setSelectedItem(null)
      }

    }
  }

  const cancelDialog = () => {
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
    setIsDeleteDialogOpen(false)
    setSelectedItem(null)
  }

  const getTotalValue = () => {
    return items.reduce((total, item) => total + item.price, 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }



 /* if (isLoading) return <CircleLoader
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
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>Items</h1>
            <p className='text-gray-600 mt-1'>
              Total Items: {items.length} | Total Value: {formatPrice(getTotalValue())}
            </p>
          </div>
          <button
            onClick={handleAddItem}
            className='flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150'
          >
            <MdAdd className='w-5 h-5' />
            <span>Add Item</span>
          </button>
        </div>

        {/* Items Table */}
        <ItemsTable items={items} onEdit={handleEditItem} onDelete={handleDeleteItem} />

        {/* Add Item Dialog */}
        <Dialog
          isOpen={isAddDialogOpen}
          onCancel={cancelDialog}
          onConfirm={() => {
            const form = document.querySelector("form") as HTMLFormElement
            if (form) {
              form.requestSubmit()
            }
          }}
          title='Add New Item'
        >
          <ItemForm onSubmit={handleFormSubmit} />
        </Dialog>

        {/* Edit Item Dialog */}
        <Dialog
          isOpen={isEditDialogOpen}
          onCancel={cancelDialog}
          onConfirm={() => {
            const form = document.querySelector("form") as HTMLFormElement
            if (form) {
              form.requestSubmit()
            }
          }}
          title='Edit Item'
        >
          <ItemForm item={selectedItem} onSubmit={handleFormSubmit} />
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog isOpen={isDeleteDialogOpen} onCancel={cancelDialog} onConfirm={confirmDelete} title='Delete Item'>
          <p className='text-gray-700'>
            Are you sure you want to delete <strong>{selectedItem?.name}</strong>? This action cannot be undone.
          </p>
        </Dialog>
      </div>
    </div>
  )
}

export default ItemsPage
