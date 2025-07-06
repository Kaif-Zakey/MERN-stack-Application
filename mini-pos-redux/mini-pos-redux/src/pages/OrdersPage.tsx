/*
import React, {type CSSProperties, useEffect, useState} from "react"
import { MdAdd } from "react-icons/md"
import OrderView from "../components/OrderView"
import Dialog from "../components/Dialog"
import type { Customer } from "../types/Customer"
import type { Item } from "../types/Item"
import type { Order } from "../types/Order"
import OrdersTable from "../components/tables/OrdersTable"
import OrderForm from "../components/forms/OrderForm"
import toast from "react-hot-toast";
import axios from "axios";
import { CircleLoader } from "react-spinners";
//import { customersData, itemsData, ordersData } from "../data/data"


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const OrdersPage: React.FC = () => {
  // Sample data - in real app, this would come from API
  /!*const [customers] = useState<Customer[]>(customersData)

  const [items] = useState<Item[]>(itemsData)

  const [orders, setOrders] = useState<Order[]>(ordersData)*!/

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)


  const fetchAllCustomers = async () => {
    try {
      const result = await axios.get<Customer[]>("http://localhost:3000/api/customers");
      setCustomers(result.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error fetching customers: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred while fetching customers.");
      }
    }
  };

  const fetchAllItems = async () => {
    try {
      const result = await axios.get<Item[]>("http://localhost:3000/api/items");
      setItems(result.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error fetching items: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred while fetching items.");
      }
    }
  };


  const fetchAllOrders = async () => {
    try {
      const result = await axios.get<Order[]>("http://localhost:3000/api/orders");
      setOrders(result.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error fetching orders: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred while fetching orders.");
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchAllCustomers(), fetchAllItems(), fetchAllOrders()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const addOrder = async (orderData: Omit<Order, "id" | "date">): Promise<Order> => {
    console.log("Attempting to add order:", orderData);
    const response = await axios.post<Order>(`http://localhost:3000/api/orders`, orderData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };


  const updateOrder = async (id: number, orderData: Omit<Order, "id" | "date">): Promise<Order> => {
    console.log(`Attempting to update order ${id}:`, orderData);
    const response = await axios.put<Order>(`http://localhost:3000/api/orders/${id}`, orderData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };


  const deleteOrder = async (id: number) => {
    console.log(`Attempting to delete order ${id}`);
    await axios.delete(`http://localhost:3000/api/orders/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
  };


  const handleAddOrder = () => {
    setSelectedOrder(null)
    setIsAddDialogOpen(true)
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsViewDialogOpen(true)
  }

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsEditDialogOpen(true)
  }

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDeleteDialogOpen(true)
  }

  /!*const handleFormSubmit = async (orderData: Omit<Order, "id" | "date">) => {
    if (selectedOrder) {
      // Update existing order
      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id ? { ...orderData, id: selectedOrder.id, date: selectedOrder.date } : order
        )
      )
      setIsEditDialogOpen(false)
      console.log("Order updated:", { ...orderData, id: selectedOrder.id })

    } else {
      // Add new order
      const newOrder: Order = {
        ...orderData,
        id: Date.now(),
        date: new Date().toISOString(),
      }
      setOrders((prev) => [...prev, newOrder])
      setIsAddDialogOpen(false)
      console.log("Order added:", newOrder)
    }
    setSelectedOrder(null)
  }*!/


  const handleFormSubmit = async (orderData: Omit<Order, "_id" | "date">) => {
    try {
      if (selectedOrder) {
        const updatedOrder = await updateOrder(selectedOrder._id, orderData);
        setOrders((prev) =>
            prev.map((order) => (order._id === selectedOrder._id ? updatedOrder : order))
        );
        toast.success(`Order #${updatedOrder._id} updated successfully!`);
      } else {
        const newOrder = await addOrder(orderData);
        setOrders((prev) => [...prev, newOrder]);
        toast.success(`Order #${newOrder._id} created successfully!`);
      }
      cancelDialog();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Operation failed: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred during order operation.");
      }
    } finally {
      setSelectedOrder(null);
    }
  };


  /!*const confirmDelete = () => {
    if (selectedOrder) {
      setOrders((prev) => prev.filter((order) => order.id !== selectedOrder.id))
      console.log("Order deleted:", selectedOrder)
      setIsDeleteDialogOpen(false)
      setSelectedOrder(null)
    }
  }*!/

  const confirmDelete = async () => {
    if (selectedOrder) {
      try {
        await deleteOrder(selectedOrder._id);
        setOrders((prev) => prev.filter((order) => order._id !== selectedOrder._id));
        toast.success(`Order #${selectedOrder._id} deleted successfully!`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(`Deletion failed: ${error.message}`);
        } else {
          toast.error("An unexpected error occurred during deletion.");
        }
      } finally {
        cancelDialog();
      }
    }
  };

  const cancelDialog = () => {
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
    setIsViewDialogOpen(false)
    setIsDeleteDialogOpen(false)
    setSelectedOrder(null)
  }

  const getTotalRevenue = () => {
    return orders.filter((order) => order.status === "completed").reduce((total, order) => total + order.total, 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  if (isLoading) return <CircleLoader
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
  />

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        {/!* Header *!/}
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>Orders</h1>
            <p className='text-gray-600 mt-1'>
              Total Orders: {orders.length} | Total Revenue: {formatPrice(getTotalRevenue())}
            </p>
          </div>
          <button
            onClick={handleAddOrder}
            className='flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150'
          >
            <MdAdd className='w-5 h-5' />
            <span>Create Order</span>
          </button>
        </div>

        {/!* Orders Table *!/}
        <OrdersTable orders={orders} onView={handleViewOrder} onEdit={handleEditOrder} onDelete={handleDeleteOrder} />

        {/!* Add Order Dialog *!/}
        <Dialog
          isOpen={isAddDialogOpen}
          onCancel={cancelDialog}
          onConfirm={() => {
            const form = document.querySelector("form") as HTMLFormElement
            if (form) {
              form.requestSubmit()
            }
          }}
          title='Create New Order'
        >
          <OrderForm customers={customers} items={items} onSubmit={handleFormSubmit} />
        </Dialog>

        {/!* Edit Order Dialog *!/}
        <Dialog
          isOpen={isEditDialogOpen}
          onCancel={cancelDialog}
          onConfirm={() => {
            const form = document.querySelector("form") as HTMLFormElement
            if (form) {
              form.requestSubmit()
            }
          }}
          title='Edit Order'
        >
          <OrderForm order={selectedOrder} customers={customers} items={items} onSubmit={handleFormSubmit} />
        </Dialog>

        {/!* View Order Dialog *!/}
        <Dialog isOpen={isViewDialogOpen} onCancel={cancelDialog} onConfirm={cancelDialog} title='Order Details'>
          {selectedOrder && <OrderView order={selectedOrder} />}
        </Dialog>

        {/!* Delete Confirmation Dialog *!/}
        <Dialog isOpen={isDeleteDialogOpen} onCancel={cancelDialog} onConfirm={confirmDelete} title='Delete Order'>
          <p className='text-gray-700'>
            Are you sure you want to delete Order #{selectedOrder?._id}? This action cannot be undone.
          </p>
        </Dialog>
      </div>
    </div>
  )
}

export default OrdersPage
*/


import React, { useEffect, useState} from "react"
import { MdAdd } from "react-icons/md"
import OrderView from "../components/OrderView"
import Dialog from "../components/Dialog"
import type { Customer } from "../types/Customer"
import type { Item } from "../types/Item"
import type { Order } from "../types/Order"
import OrdersTable from "../components/tables/OrdersTable"
import OrderForm from "../components/forms/OrderForm"
import toast from "react-hot-toast";
import axios from "axios"; // Keep for axios.isAxiosError
import { CircleLoader } from "react-spinners";
// Import service functions
import { getAllCustomers } from "../services/customerService";
import { getAllItems } from "../services/itemService";
import { getAllOrders, addOrder, editOrder, removeOrder } from "../services/orderService"; // <-- NEW: Import order service functions



const OrdersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Consolidate loading state management for the spinner
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start as true for initial data fetch
  const [color] = useState("#000000"); // Spinner color

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)


  // Centralized fetch functions using services
  const fetchAllCustomersData = async () => { // Renamed to avoid confusion with imported service
    try {
      const result = await getAllCustomers(); // Use customerService
      setCustomers(result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error fetching customers: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred while fetching customers.");
      }
      throw error; // Re-throw to be caught by loadData's Promise.all catch
    }
  };

  const fetchAllItemsData = async () => { // Renamed to avoid confusion with imported service
    try {
      const result = await getAllItems(); // Use itemService
      setItems(result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error fetching items: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred while fetching items.");
      }
      throw error; // Re-throw to be caught by loadData's Promise.all catch
    }
  };


  const fetchAllOrdersData = async () => { // Renamed to avoid confusion with imported service
    try {
      const result = await getAllOrders(); // Use orderService
      setOrders(result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error fetching orders: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred while fetching orders.");
      }
      throw error; // Re-throw to be caught by loadData's Promise.all catch
    }
  };

  useEffect(() => {
    const loadAllInitialData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchAllCustomersData(), fetchAllItemsData(), fetchAllOrdersData()]);
      } catch (error) {
        // Errors are already toasted by individual fetch functions
        console.error("Failed to load all initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAllInitialData();
  }, []);

  // Removed direct axios calls and moved to handleFormSubmit/confirmDelete to use services
  // const addOrder = async (orderData: Omit<Order, "id" | "date">): Promise<Order> => { ... };
  // const updateOrder = async (id: number, orderData: Omit<Order, "id" | "date">): Promise<Order> => { ... };
  // const deleteOrder = async (id: number) => { ... };


  const handleAddOrder = () => {
    setSelectedOrder(null)
    setIsAddDialogOpen(true)
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsViewDialogOpen(true)
  }

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsEditDialogOpen(true)
  }

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDeleteDialogOpen(true)
  }

  // Refined handleFormSubmit to use services and optimistic UI updates
  const handleFormSubmit = async (orderData: Omit<Order, "_id" | "date" | "total">) => { // Updated type
    try {
      if (selectedOrder) {
        // Update existing order
        const updatedOrder = await editOrder(selectedOrder._id, orderData); // Use editOrder service
        setOrders((prev) =>
            prev.map((order) => (order._id === selectedOrder._id ? updatedOrder : order))
        );
        toast.success(`Order #${updatedOrder._id} updated successfully!`);
      } else {
        // Add new order
        const newOrder = await addOrder(orderData); // Use addOrder service
        setOrders((prev) => [...prev, newOrder]);
        toast.success(`Order #${newOrder._id} created successfully!`);
      }
      cancelDialog(); // Close dialogs and clear selected order after successful operation
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Operation failed: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred during order operation.");
      }
    }
    // No finally block for setSelectedOrder(null) here, as cancelDialog already handles it
  };

  // Refined confirmDelete to use service and optimistic UI updates
  const confirmDelete = async () => {
    if (selectedOrder) {
      try {
        await removeOrder(selectedOrder._id); // Use removeOrder service
        setOrders((prev) => prev.filter((order) => order._id !== selectedOrder._id)); // Optimistic update
        toast.success(`Order #${selectedOrder._id} deleted successfully!`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(`Deletion failed: ${error.message}`);
        } else {
          toast.error("An unexpected error occurred during deletion.");
        }
      } finally {
        cancelDialog(); // Close dialog and clear selected order after operation attempt
      }
    }
  };

  const cancelDialog = () => {
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
    setIsViewDialogOpen(false)
    setIsDeleteDialogOpen(false)
    setSelectedOrder(null) // Clears selected order when any dialog is cancelled/closed
  }

  const getTotalRevenue = () => {
    return orders.filter((order) => order.status === "completed").reduce((total, order) => total + order.total, 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  // Improved spinner rendering
  if (isLoading)
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", width: "100%" }}>
          <CircleLoader color={color} loading={isLoading} size={150} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    );

  return (
      <div className='p-6 bg-gray-100 min-h-screen'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-800'>Orders</h1>
              <p className='text-gray-600 mt-1'>
                Total Orders: {orders.length} | Total Revenue: {formatPrice(getTotalRevenue())}
              </p>
            </div>
            <button
                onClick={handleAddOrder}
                className='flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150'
            >
              <MdAdd className='w-5 h-5' />
              <span>Create Order</span>
            </button>
          </div>

          {/* Orders Table */}
          <OrdersTable orders={orders} onView={handleViewOrder} onEdit={handleEditOrder} onDelete={handleDeleteOrder} />

          {/* Add Order Dialog */}
          <Dialog
              isOpen={isAddDialogOpen}
              onCancel={cancelDialog}
              onConfirm={() => {
                const form = document.querySelector("form") as HTMLFormElement
                if (form) {
                  form.requestSubmit()
                }
              }}
              title='Create New Order'
          >
            <OrderForm customers={customers} items={items} onSubmit={handleFormSubmit} />
          </Dialog>

          {/* Edit Order Dialog */}
          <Dialog
              isOpen={isEditDialogOpen}
              onCancel={cancelDialog}
              onConfirm={() => {
                const form = document.querySelector("form") as HTMLFormElement
                if (form) {
                  form.requestSubmit()
                }
              }}
              title='Edit Order'
          >
            <OrderForm order={selectedOrder} customers={customers} items={items} onSubmit={handleFormSubmit} />
          </Dialog>

          {/* View Order Dialog */}
          <Dialog isOpen={isViewDialogOpen} onCancel={cancelDialog} onConfirm={cancelDialog} title='Order Details'>
            {selectedOrder && <OrderView order={selectedOrder} />}
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog isOpen={isDeleteDialogOpen} onCancel={cancelDialog} onConfirm={confirmDelete} title='Delete Order'>
            <p className='text-gray-700'>
              Are you sure you want to delete Order #{selectedOrder?._id}? This action cannot be undone.
            </p>
          </Dialog>
        </div>
      </div>
  )
}

export default OrdersPage
