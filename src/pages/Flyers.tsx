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
import { useNavigate } from 'react-router-dom';

const flyersData = [
  { id: 1, name: 'Summer Sale', template: 'Promotion', status: 'active', created: '2023-04-23', lastEdited: '2023-04-25', thumbnail: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 2, name: 'New Product Launch', template: 'Product', status: 'draft', created: '2023-04-22', lastEdited: '2023-04-22', thumbnail: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, name: 'Holiday Special', template: 'Promotion', status: 'active', created: '2023-04-21', lastEdited: '2023-04-24', thumbnail: 'https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 4, name: 'Customer Appreciation', template: 'Event', status: 'scheduled', created: '2023-04-20', lastEdited: '2023-04-26', thumbnail: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 5, name: 'Weekly Newsletter', template: 'Newsletter', status: 'active', created: '2023-04-19', lastEdited: '2023-04-19', thumbnail: 'https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 6, name: 'Flash Sale', template: 'Promotion', status: 'scheduled', created: '2023-04-18', lastEdited: '2023-04-18', thumbnail: 'https://images.pexels.com/photos/3184435/pexels-photo-3184435.jpeg?auto=compress&cs=tinysrgb&w=600' }
];

const templates = [
  {
    id: 1,
    name: 'Portrait',
    description: 'Vertical flyer, ideal for posters and standees',
    thumbnail: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'Landscape',
    description: 'Horizontal flyer, great for banners and wide displays',
    thumbnail: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    name: 'Circular Table Tent',
    description: 'Perfect for table tents and circular displays',
    thumbnail: 'https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    name: 'Start from Scratch',
    description: 'Create a flyer from a blank canvas',
    thumbnail: '', // Will use a custom icon instead of an image
    isScratch: true
  }
];

const Flyers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showNewFlyerModal, setShowNewFlyerModal] = useState(false);
  const navigate = useNavigate();
  
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
    <div className="space-y-6 px-2 sm:px-4 md:px-6 lg:px-8 w-full">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-transparent">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-white opacity-85"></div>
          </div>
          <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-5xl w-full mx-4" style={{ boxShadow:'22px 12px 99.3px 6px rgba(94, 95, 136, 0.10)',border:'1px solid #E5E7EB' }}>
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
                        className="group relative rounded-lg overflow-hidden border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer flex flex-col"
                      >
                        {template.isScratch ? (
                          <div className="flex flex-col items-center justify-center h-40 bg-gray-50">
                            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-2">
                              <Plus className="h-8 w-8 text-primary-600" />
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-40 bg-gradient-to-br from-primary-50 to-primary-100">
                            {template.name === 'Portrait' && (
                              <svg width="56" height="80" viewBox="0 0 56 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="8" y="8" width="40" height="64" rx="8" fill="#6366F1" fillOpacity="0.15" />
                                <rect x="16" y="20" width="24" height="8" rx="2" fill="#6366F1" fillOpacity="0.3" />
                                <rect x="16" y="36" width="24" height="4" rx="2" fill="#6366F1" fillOpacity="0.2" />
                                <rect x="16" y="46" width="16" height="4" rx="2" fill="#6366F1" fillOpacity="0.2" />
                              </svg>
                            )}
                            {template.name === 'Landscape' && (
                              <svg width="80" height="56" viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="8" y="8" width="64" height="40" rx="8" fill="#6366F1" fillOpacity="0.15" />
                                <rect x="20" y="16" width="32" height="8" rx="2" fill="#6366F1" fillOpacity="0.3" />
                                <rect x="20" y="30" width="32" height="4" rx="2" fill="#6366F1" fillOpacity="0.2" />
                                <rect x="20" y="38" width="20" height="4" rx="2" fill="#6366F1" fillOpacity="0.2" />
                              </svg>
                            )}
                            {template.name === 'Circular Table Tent' && (
                              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="32" fill="#6366F1" fillOpacity="0.12" />
                                <circle cx="40" cy="40" r="20" fill="#6366F1" fillOpacity="0.18" />
                                <rect x="28" y="36" width="24" height="8" rx="4" fill="#6366F1" fillOpacity="0.25" />
                              </svg>
                            )}
                          </div>
                        )}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <h4 className="text-lg font-medium text-gray-900 text-center">{template.name}</h4>
                          <p className="mt-1 text-sm text-gray-500 text-center">{template.description}</p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          {template.isScratch ? (
                            <button className="btn btn-primary">Start</button>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={() => navigate(`/table-tent-designer/${template.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')}`)}
                            >
                              Use Template
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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