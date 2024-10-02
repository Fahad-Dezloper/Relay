"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadCloud, User, Settings, LogOut, Home, Bell, PlusIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import React from 'react'
import { Textarea } from './ui/textarea'

export default function Dashboard() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [activePage, setActivePage] = useState('home')
  const [uploadedVideos, setUploadedVideos] = useState<any[]>([])
  const [pendingReviews, setPendingReviews] = useState<any[]>([])  
  const [notifications, setNotifications] = useState<string[]>([]) 
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [fileTitle, setFileTitle] = useState('')
  const [fileDescription, setFileDescription] = useState('')

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Add to uploadedVideos list for demo purposes
      setUploadedVideos([...uploadedVideos, { name: file.name, status: "Pending Review" }])
    }

    if (!uploadedFile) return;  
  }

const handleSubmitUpload = async (event: React.FormEvent) => {
  event.preventDefault();

  if (!uploadedFile) return; // Ensure there's a file uploaded

  // Create a new file with the user's specified title
  const newFile = new File([uploadedFile], fileTitle || uploadedFile.name, {
    type: uploadedFile.type,
  });

  console.log('Uploading:', { file: newFile, title: fileTitle, description: fileDescription });
  
  // Prepare form data
  const formData = new FormData();
  formData.append('file', newFile);

  // Send the form data to the server
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    console.error('Error:', response.status, await response.text());
    return;
  }

  const data = await response.json();
  console.log(data); // Handle the response as needed

  // Close the dialog and reset form fields
  setIsUploadDialogOpen(false);
  setFileTitle('');
  setFileDescription('');
  setUploadedFile(null);
};


  const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `Editor.${a.length - i}`
)

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Feature */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="">
                  <p className="text-sm text-gray-500">Connect with your editor</p>
                </div>
                <div className='flex mt-2'>
                  <Input placeholder='Add Editor Id' />
                  <Button className="ml-2" type="button">Connect</Button>
                </div>


                 <ScrollArea className="h-44 mt-5 w-full rounded-md border">
                    <div className="p-4">
                      <h4 className="mb-4 text-sm leading-none font-semibold">Editors</h4>
                      {tags.map((tag) => (
                        <>
                          <div key={tag} className="text-sm flex justify-between items-center">
                            {tag}
                            <div className='flex gap-5'>
                              <PlusIcon className='hover:bg-green-300 duration-200 ease-in-out text-green-600 rounded-full p-[3px] cursor-pointer' />
                            </div>
                          </div>
                          <Separator className="my-2" />
                        </>
                      ))}
                    </div>
                  </ScrollArea>
              </CardContent>
            </Card>

            {/* Upload Feature */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Upload Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center w-full">
                  <Label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload} />
                  </Label>
                </div>
                {uploadedFile && (
                <div className='flex justify-between w-full'>
                    <p className="mt-4 text-sm text-gray-500">Uploaded: {uploadedFile.name}</p>
                    <Button className="mt-4" type="button" onClick={handleFileUpload}>Send</Button>
                </div>
                )}
              </CardContent>
            </Card> */}

            <Card>
              <CardHeader>
                <CardTitle>Upload Files</CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <div className="flex items-center justify-center w-full">
                      <Label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                      </Label>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload File</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitUpload} className="space-y-4">
                      <div>
                        <Label htmlFor="file-title">File Title</Label>
                        <Input
                          id="file-title"
                          value={fileTitle}
                          onChange={(e) => setFileTitle(e.target.value)}
                          placeholder="Enter file title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="file-description">File Description</Label>
                        <Textarea
                          id="file-description"
                          value={fileDescription}
                          onChange={(e) => setFileDescription(e.target.value)}
                          placeholder="Enter file description"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="file-upload">File</Label>
                        <Input
                          id="file-upload"
                          type="file"
                          onChange={handleFileUpload}
                          required
                        />
                      </div>
                      <Button type="submit">Upload</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                {uploadedFile && (
                  <p className="mt-4 text-sm text-gray-500">Uploaded: {uploadedFile.name}</p>
                )}
              </CardContent>
            </Card>

            {/* Pending Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pendingReviews.length > 0 ? pendingReviews.map((review, idx) => (
                    <li key={idx}>
                      <div className="flex justify-between">
                        <p>{review.name}</p>
                        <div>
                          <Button className="mr-2">Approve</Button>
                          <Button variant="secondary">Request Revisions</Button>
                        </div>
                      </div>
                    </li>
                  )) : <p>No pending reviews</p>}
                </ul>
              </CardContent>
            </Card>

            {/* Uploaded Videos */}
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {uploadedVideos.length > 0 ? uploadedVideos.map((video, idx) => (
                    <li key={idx}>
                      <div className="flex justify-between">
                        <p>{video.name}</p>
                        <p>Status: {video.status}</p>
                      </div>
                    </li>
                  )) : <p>No uploaded videos</p>}
                </ul>
              </CardContent>
            </Card>
          </div>
        )
      case 'account':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList>
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <div className="space-y-2">
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>Email:</strong> john.doe@example.com</p>
                    <p><strong>Role:</strong> Creator</p>
                  </div>
                </TabsContent>
                <TabsContent value="billing">
                  <div className="space-y-2">
                    <p><strong>Plan:</strong> Pro</p>
                    <p><strong>Billing Cycle:</strong> Monthly</p>
                    <p><strong>Next Payment:</strong> 06/15/2023</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-fit bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md ">
        <div className="p-4 flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Bell className="cursor-pointer" size={24} />
        </div>
        <nav className="mt-4">
          <a href="#" className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${activePage === 'home' ? 'bg-gray-200' : ''}`} onClick={() => setActivePage('home')}>
            <Home className="inline-block mr-2" size={18} /> Home
          </a>
          <a href="#" className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${activePage === 'account' ? 'bg-gray-200' : ''}`} onClick={() => setActivePage('account')}>
            <User className="inline-block mr-2" size={18} /> Account
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <Settings className="inline-block mr-2" size={18} /> Settings
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <LogOut className="inline-block mr-2" size={18} /> Logout
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6">Welcome, Creator!</h2>
        {renderContent()}
      </div>
    </div>
  )
}
