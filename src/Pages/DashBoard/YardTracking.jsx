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

const TrackYardManager = () => {
  const [bikes, setBikes] = useState([])
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [selectedBike, setSelectedBike] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterStatus, setFilterStatus] = useState('ALL')

  const loadBikes = async (status) => {
    try {
      setLoading(true)
      let url = '/yard/bikes'
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
    loadBikes(filterStatus)
  }, [filterStatus])

  const handleStatusChange = (bike) => {
    setSelectedBike(bike)
    setIsAlertOpen(true)
  }

  const nextStatusForYard = (currentStatus) => {
    switch (currentStatus) {
      case 'IN_TRANSIT_TO_YARD':
        return 'AT_BIKESETU_YARD'
      case 'AT_BIKESETU_YARD':
        return 'IN_TRANSIT_TO_FRANCHISEE'
      default:
        return currentStatus
    }
  }

  const confirmStatusChange = async () => {
    if (selectedBike) {
      let newStatus = nextStatusForYard(selectedBike.status)

      try {
        const updatedBike = await Global.httpPost(`/yard/update-status/${selectedBike.id}`, { newStatus })

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
      case 'IN_TRANSIT_TO_YARD':
        return 'text-blue-500 bg-blue-100'
      case 'AT_YARD':
        return 'text-purple-500 bg-purple-100'
      case 'IN_TRANSIT_TO_FRANCHISEE':
        return 'text-indigo-500 bg-indigo-100'
      default:
        return ''
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="container mx-auto  p-4 font-dm-sans">
      <h1 className="text-2xl font-bold mb-4">Yard Manager - Bike Tracking</h1>

      <div className="mb-4">
        <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="IN_TRANSIT_TO_YARD">In Transit to Yard</SelectItem>
            <SelectItem value="AT_YARD">At Yard</SelectItem>
            <SelectItem value="IN_TRANSIT_TO_FRANCHISEE">In Transit to Franchisee</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative overflow-y-scroll h-[70vh] custom-scrollbar">
        <Table className="w-full">
          <TableHeader className="font-bold text-black">
            <TableRow >
              <TableHead >ID</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
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
                    {bike.status}
                  </span>
                </TableCell>
                <TableCell>{new Date(bike.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {bike.status !== 'IN_TRANSIT_TO_FRANCHISEE' ? (
                    <Button onClick={() => handleStatusChange(bike)}>
                      Update Status
                    </Button>
                  ) : (
                    <Button disabled>
                      In Transit to Franchisee
                    </Button>
                  )}
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
              Are you sure you want to update the status of {selectedBike?.modal?.name} to the {nextStatusForYard(selectedBike?.status)}?
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

export default TrackYardManager
