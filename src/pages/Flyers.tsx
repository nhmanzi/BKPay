import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Plus, 
  Image, 
  Type, 
  Brush, 
  LayoutGrid, 
  Eye, 
  Download, 
  Copy, 
  Edit, 
  Trash2,
  Calendar,
  ArrowUpDown
} from 'lucide-react';

const flyersData = [
  { id: 1, name: 'Summer Sale', template: 'Promotion', status: 'active', created: '2023-04-23', lastEdited: '2023-04-25', thumbnail: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 2, name: 'New Product Launch', template: 'Product', status: 'draft', created: '2023-04-22', lastEdited: '2023-04-22', thumbnail: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, name: 'Holiday Special', template: 'Promotion', status: 'active', created: '2023-04-21', lastEdited: '2023-04-24', thumbnail: 'https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 4, name: 'Customer Appreciation', template: 'Event', status: 'scheduled', created: '2023-04-20', lastEdited: '2023-04-26', thumbnail: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 5, name: 'Weekly Newsletter', template: 'Newsletter', status: 'active', created: '2023-04-19', lastEdited: '2023-04-19', thumbnail: 'https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 6, name: 'Flash Sale', template: 'Promotion', status: 'scheduled', created: '2023-04-18', lastEdited: '2023-04-18', thumbnail: 'https://images.pexels.com/photos/3184435/pexels-photo-3184435.jpeg?auto=compress&cs=tinysrgb&w=600' }
];

const templates = [
  { id: 1, name: 'Promotion', description: 'Perfect for sales and special offers', thumbnail: 'https://images.pexels.com/photos/5874617/pexels-photo-5874617.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 2, name: 'Product', description: 'Showcase your products with style', thumbnail: 'https://images.pexels.com/photos/5872357/pexels-photo-5872357.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, name: 'Event', description: 'Promote your upcoming events', thumbnail: 'https://images.pexels.com/photos/5911214/pexels-photo-5911214.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 4, name: 'Newsletter', description: 'Keep your customers informed', thumbnail: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=600' }
];

const Flyers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showNewFlyerModal, setShowNewFlyerModal] = useState(false);
  
  const filteredFlyers = flyersData.filter(flyer => {
    const matchesSearch = 
      flyer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || flyer.status === statusFilter;
    const matchesTemplate = templateFilter === 'all' || flyer.template === templateFilter;
    
    return matchesSearch && matchesStatus && matchesTemplate;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800';
      case 'scheduled':
        return 'bg-warning-100 text-warning-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Marketing Flyers</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowNewFlyerModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Flyer
        </button>
      </div>

      {/* Templates Gallery (when modal is open) */}
      {showNewFlyerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Choose a Template
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setShowNewFlyerModal(false)}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className="group relative rounded-lg overflow-hidden border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden bg-gray-200">
                            <img
                              src={template.thumbnail}
                              alt={template.name}
                              className="w-full h-40 object-cover object-center group-hover:opacity-90 transition-opacity"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="text-lg font-medium text-gray-900">{template.name}</h4>
                            <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="btn btn-primary">
                              Use Template
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Or start from scratch</h4>
                      <div className="flex space-x-4">
                        <button className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg border border-gray-200 p-4 flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                            <Image className="h-6 w-6 text-primary-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Blank Design</span>
                        </button>
                        
                        <button className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg border border-gray-200 p-4 flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-2">
                            <Type className="h-6 w-6 text-secondary-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Text Only</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowNewFlyerModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search flyers"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <select
                className="appearance-none block pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Draft</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <div className="relative">
              <select
                className="appearance-none block pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={templateFilter}
                onChange={(e) => setTemplateFilter(e.target.value)}
              >
                <option value="all">All Templates</option>
                <option value="Promotion">Promotion</option>
                <option value="Product">Product</option>
                <option value="Event">Event</option>
                <option value="Newsletter">Newsletter</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-500'}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-500'}`}
                onClick={() => setViewMode('list')}
              >
                <ArrowUpDown className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Flyers Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFlyers.map((flyer) => (
            <div 
              key={flyer.id}
              className="group bg-white overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow transition-shadow"
            >
              <div className="relative aspect-w-16 aspect-h-9 bg-gray-200 overflow-hidden">
                <img 
                  src={flyer.thumbnail}
                  alt={flyer.name}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-white rounded-full text-gray-700 hover:text-primary-600">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-white rounded-full text-gray-700 hover:text-primary-600">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-white rounded-full text-gray-700 hover:text-error-600">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{flyer.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{flyer.template}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(flyer.status)}`}>
                    {flyer.status.charAt(0).toUpperCase() + flyer.status.slice(1)}
                  </span>
                </div>
                <div className="mt-4 text-xs text-gray-500 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Last edited {new Date(flyer.lastEdited).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Flyers List View */}
      {viewMode === 'list' && (
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flyer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Edited
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFlyers.map((flyer) => (
                  <tr key={flyer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                          <img src={flyer.thumbnail} alt="" className="h-10 w-16 object-cover" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{flyer.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{flyer.template}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(flyer.status)}`}>
                        {flyer.status.charAt(0).toUpperCase() + flyer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(flyer.created).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(flyer.lastEdited).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-gray-600 hover:text-gray-900">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Copy className="h-5 w-5" />
                        </button>
                        <button className="text-gray-600 hover:text-error-600">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flyers;