import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../UIs/shadcn-ui/table"
import { Button } from "../../UIs/shadcn-ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../UIs/shadcn-ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../UIs/shadcn-ui/select"
import Global from '../../Utils/Global'
import './AddBike.css'

const allowedStatuses = ['MANUFACTURING', 'MANUFACTURED']
const map = {
  'MANUFACTURING': 'Manufacturing',
  'MANUFACTURED': 'Manufactured',
  'IN_TRANSIT_TO_YARD': 'In transit to Yard',
  'AT_BIKESETU_YARD': 'At Yard',
  'IN_TRANSIT_TO_FRANCHISEE': 'In transit to Franchisee',
  'AT_FRANCHISEE': 'At Franchisee',
  'DELIVERED_TO_CUSTOMER': 'Delivered to Customer',
}

const TrackManufacturing = () => {
  const [bikes, setBikes] = useState([])
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [selectedBike, setSelectedBike] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterStatus, setFilterStatus] = useState('ALL')

  const loadBikes = async (status) => {
    try {
      setLoading(true)
      let url = '/manufacturer/bikes'
      if (status && status !== 'ALL') {
        url += `?status=${status}`
      }
      const response = await Global.httpGet(url)

      if (response && Array.isArray(response)) {
        setBikes(response)
      } else {
        setError('Invalid response format from API.')
      }
    } catch (err) {
      setError('Failed to fetch bike data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Load bikes when component mounts
    loadBikes(filterStatus)
  }, [filterStatus]) // Trigger API call when filterStatus changes

  const handleStatusChange = (bike) => {
    setSelectedBike(bike)
    setIsAlertOpen(true)
  }

  const nextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'MANUFACTURING':
        return 'MANUFACTURED';
      case 'MANUFACTURED':
        return 'IN_TRANSIT_TO_YARD';
      case 'IN_TRANSIT_TO_YARD':
        return 'AT_BIKESETU_YARD';
      case 'AT_BIKESETU_YARD':
        return 'IN_TRANSIT_TO_FRANCHISEE';
      case 'IN_TRANSIT_TO_FRANCHISEE':
        return 'AT_FRANCHISEE';
      case 'AT_FRANCHISEE':
        return 'DELIVERED_TO_CUSTOMER';
      case 'DELIVERED_TO_CUSTOMER':
        return 'DELIVERED_TO_CUSTOMER';
      default:
        return 'MANUFACTURING';
    }
  }


  const confirmStatusChange = async () => {
    if (selectedBike) {
      let newStatus = nextStatus(selectedBike.status)

      try {
        const updatedBike = await Global.httpPut(`/manufacturer/bikes/${selectedBike.id}/status`, { status: newStatus })

        if (updatedBike && updatedBike.id) {
          setBikes(bikes.map(bike => bike.id === updatedBike.id ? updatedBike : bike))
        } else {
          setError('Failed to update bike status.')
        }
      } catch (err) {
        setError('Failed to update bike status.')
      }
    }
    setIsAlertOpen(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'MANUFACTURING':
        return 'text-yellow-500 bg-yellow-100'
      case 'MANUFACTURED':
        return 'text-green-500 bg-green-100'
      case 'IN_TRANSIT_TO_YARD':
        return 'text-blue-500 bg-blue-100'
      case 'DELIVERED_TO_CUSTOMER':
        return 'text-gray-500 bg-gray-100'
      default:
        return ''
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center  items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="container mx-auto  p-4 font-dm-sans">
      <h1 className="text-2xl font-bold mb-4">E-Bike Manufacturing Tracking</h1>

      <div className="mb-4">
        <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="MANUFACTURING">Manufacturing</SelectItem>
            <SelectItem value="MANUFACTURED">Manufactured</SelectItem>
            <SelectItem value="IN_TRANSIT_TO_YARD">In Transit to Yard</SelectItem>
            <SelectItem value="DELIVERED_TO_CUSTOMER">Delivered to Customer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative overflow-y-scroll h-[70vh] custom-scrollbar">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Update Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bikes.map((bike) => (
              <TableRow key={bike.id}>
                <TableCell>{bike.id}</TableCell>
                <TableCell>
                  {bike?.modal?.brand?.name ? `${bike.modal.brand.name} - ${bike.modal.name}` : 'Unknown Model'}
                </TableCell>
                <TableCell>
                  <span className={`font-semibold p-2 rounded-lg ${getStatusColor(bike.status)}`}>
                    {map[bike.status]}
                </span>
                </TableCell>
                <TableCell>{new Date(bike.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {allowedStatuses.includes(bike.status) ? (
                    <Button onClick={() => handleStatusChange(bike)}>
                      {map[nextStatus(bike.status)]}
                    </Button>
                  ) : (
                    <Button disabled>
                      {map[nextStatus(bike.status)]}
                    </Button>
                  )
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update the status of {selectedBike?.modal?.name} to the {nextStatus(selectedBike?.status)}?
              Current status: {selectedBike?.status}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default TrackManufacturing
