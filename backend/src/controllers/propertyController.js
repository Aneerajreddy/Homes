const { propertyService } = require('../services/database');

exports.getAll = async (req, res) => {
  try {
    const {
      location,
      minPrice = 0,
      maxPrice = 100000,
      bedrooms = 0,
      bathrooms = 0,
      propertyType = 'all',
      page = 1,
      limit = 6
    } = req.query;

    console.log('Incoming property search query:', req.query);

    // For now, return all properties - we'll implement filtering later
    const properties = await propertyService.findAll();
    
    // Simple filtering in memory for now
    let filteredProperties = properties.filter(property => {
      return property.status === 'verified' &&
             property.price >= Number(minPrice) &&
             property.price <= Number(maxPrice) &&
             property.bedrooms >= Number(bedrooms) &&
             property.bathrooms >= Number(bathrooms);
    });

    if (location) {
      filteredProperties = filteredProperties.filter(property => 
        (property.title && property.title.toLowerCase().includes(location.toLowerCase())) ||
        (property.location && property.location.toLowerCase().includes(location.toLowerCase()))
      );
    }

    if (propertyType !== 'all') {
      filteredProperties = filteredProperties.filter(property => property.propertyType === propertyType);
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const paginatedProperties = filteredProperties.slice(skip, skip + Number(limit));
    const hasMore = skip + paginatedProperties.length < filteredProperties.length;

    console.log('Properties found:', paginatedProperties.length);
    res.json({ properties: paginatedProperties, hasMore });
  } catch (err) {
    console.error('Property fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const property = await propertyService.create({ ...req.body, ownerId: req.user.id });
    res.status(201).json(property);
  } catch (err) {
    console.error('Property creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const property = await propertyService.updateById(req.params.id, req.body);
    res.json(property);
  } catch (err) {
    console.error('Property update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.delete = async (req, res) => {
  try {
    await propertyService.deleteById(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch (err) {
    console.error('Property deletion error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
