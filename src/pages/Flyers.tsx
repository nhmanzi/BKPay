import React from 'react';
import { Plus, Download, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const savedTemplates = [
  {
    id: 1,
    name: 'Summer Sale 2024',
    thumbnail: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastModified: '2024-03-15'
  },
  {
    id: 2,
    name: 'New Product Launch',
    thumbnail: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastModified: '2024-03-10'
  },
  {
    id: 3,
    name: 'Holiday Special',
    thumbnail: 'https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastModified: '2024-03-05'
  },
  {
    id: 4,
    name: 'Customer Appreciation',
    thumbnail: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastModified: '2024-03-01'
  }
];

const Flyers = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-6 lg:px-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Marketing Flyers</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Choose a Template
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Select a template to start creating your marketing flyer
          </p>
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
                <div className="relative flex items-center justify-center h-40 bg-gradient-to-br from-primary-50 to-primary-100">
                  {template.name === 'Portrait' && (
                    <div className="grid grid-cols-2 gap-1 w-20 h-28">
                      <img src="/assets/portrait/Portrait_01.jpg" alt="Portrait 1" className="object-cover w-full h-full rounded" />
                      <img src="/assets/portrait/Portrait_02.jpg" alt="Portrait 2" className="object-cover w-full h-full rounded" />
                      <img src="/assets/portrait/Portrait_03.jpg" alt="Portrait 3" className="object-cover w-full h-full rounded" />
                      <img src="/assets/portrait/Portrait_04.jpg" alt="Portrait 4" className="object-cover w-full h-full rounded" />
                    </div>
                  )}
                  {template.name === 'Landscape' && (
                    <div className="w-full flex justify-center items-center h-full">
                      <div className="grid grid-cols-3 gap-1 w-40 h-24">
                        <img src="/assets/landscape/Landscape_01.jpg" alt="Landscape 1" className="object-cover w-full h-full rounded" />
                        <img src="/assets/landscape/Landscape_02.jpg" alt="Landscape 2" className="object-cover w-full h-full rounded" />
                        <img src="/assets/landscape/Landscape_02.png" alt="Landscape 2 PNG" className="object-cover w-full h-full rounded" />
                        <img src="/assets/landscape/Landscape_03.jpg" alt="Landscape 3" className="object-cover w-full h-full rounded" />
                        <img src="/assets/landscape/Landscape_04.jpg" alt="Landscape 4" className="object-cover w-full h-full rounded" />
                      </div>
                    </div>
                  )}
                  {template.name === 'Circular Table Tent' && (
                    <div className="w-full flex justify-center items-center h-full">
                      <div className="grid grid-cols-2 gap-1 w-32 h-30">
                        <img src="/assets/circular/Circular_01.jpg" alt="Circular 1" className="object-cover w-full h-full rounded-full" />
                        <img src="/assets/circular/Circular_02.jpg" alt="Circular 2" className="object-cover w-full h-full rounded-full" />
                        <img src="/assets/circular/Circular_03.jpg" alt="Circular 3" className="object-cover w-full h-full rounded-full" />
                        <img src="/assets/circular/Circular_04.jpg" alt="Circular 4" className="object-cover w-full h-full rounded-full" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 rounded-lg pointer-events-none" />
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Saved Templates
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Your previously created and saved flyer templates
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="rounded-full bg-primary-50 p-3 mb-4">
            <FileText className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved templates yet</h3>
          <p className="text-sm text-gray-500 text-center max-w-sm">
            Create your first flyer using one of our templates above. Your saved templates will appear here for easy access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Flyers;