'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { AddTpcForm } from "@/components/tpo/AddTpcForm"
import { TpcList } from "@/components/tpo/TpcList"

interface Tpc {
  _id: string
  name: string
  email: string
}

export default function ManageTpcPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [tpcs, setTpcs] = useState<Tpc[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTpcs()
  }, [])

  const fetchTpcs = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/tpo/get-tpcs', { headers: { 'Cache-Control': 'no-cache' } });
      setTpcs(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching TPCs:', error)
      toast({
        title: "Error",
        description: "Failed to load TPCs. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/tpo/delete-tpc/${id}`);
      fetchTpcs(); // Refresh the list after deletion
      toast({
        title: "Success",
        description: "TPC deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting TPC:', error);
      toast({
        title: "Error",
        description: "Failed to delete TPC. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-8 ">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#244855]">Manage TPCs</h1>
      <div className="mb-8">
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full md:w-auto bg-[#E64833] text-white hover:bg-[#244855] transition-colors"
        >
          {showAddForm ? 'Close Form' : 'Add TPC'}
        </Button>
      </div>
      {showAddForm && <AddTpcForm onClose={() => setShowAddForm(false)} fetchTpcs={fetchTpcs} />}
      <TpcList tpcs={tpcs} loading={loading} handleDelete={handleDelete} />
    </div>
  )
}
