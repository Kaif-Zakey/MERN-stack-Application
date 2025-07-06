import type { Customer } from "../types/Customer"
import type { Item } from "../types/Item"
import type { Order } from "../types/Order"

export const customersData: Customer[] = [
  {
    _id: "abc",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main St, New York, NY 10001",
  },
  {
    _id: "cde",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 8901",
    address: "456 Oak Ave, Los Angeles, CA 90001",
  },
]

export const itemsData: Item[] = [
  {
    _id: "efg",
    name: "Wireless Headphones",
    price: 99.99,
  },
  {
    _id: "hij",
    name: "Bluetooth Speaker",
    price: 49.99,
  },
  {
    _id: "klm",
    name: "USB-C Cable",
    price: 12.99,
  },
  {
    _id: "nop",
    name: "Phone Case",
    price: 24.99,
  },
]

export const ordersData: Order[] = [
  {
    _id: 1,
    _customerId: 1,
    customerName: "John Doe",
    items: [
      { _itemId: 1, itemName: "Wireless Headphones", price: 99.99, quantity: 1, subtotal: 99.99 },
      { _itemId: 3, itemName: "USB-C Cable", price: 12.99, quantity: 2, subtotal: 25.98 },
    ],
    total: 125.97,
    date: "2025-05-27T10:30:00Z",
    status: "completed",
  },
  {
    _id: 2,
    _customerId: 2,
    customerName: "Jane Smith",
    items: [{ _itemId: 2, itemName: "Bluetooth Speaker", price: 49.99, quantity: 1, subtotal: 49.99 }],
    total: 49.99,
    date: "2025-05-27T14:15:00Z",
    status: "pending",
  },
]
