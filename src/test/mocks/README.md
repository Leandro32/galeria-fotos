# Test Mocks

This directory contains mock data and service implementations for testing.

## Adding a new mock

1. Create a new file for the mock in this directory
2. Export the mock from the file
3. Import and use the mock in your test

## Example

```typescript
// src/test/mocks/photo-data.ts
import { Photo } from '../../types';

export const mockPhotos: Photo[] = [
  {
    id: 1,
    title: 'Test Photo 1',
    description: 'A test photo',
    url: '/images/test1.jpg',
    location: 'Test Location',
    price: 100,
    size: '10x15',
    date: '2023-01-01',
    photographer: 'Test Photographer',
    hour: '12:00',
    categories: ['nature'],
    orientation: 'landscape'
  },
  // Add more mock photos as needed
];
```

## Service Mocks

For API services or other external dependencies, create mock implementations:

```typescript
// src/test/mocks/api-service.ts
import { Photo } from '../../types';
import { mockPhotos } from './photo-data';

export const mockApiService = {
  getPhotos: vi.fn().mockResolvedValue(mockPhotos),
  getPhotoById: vi.fn().mockImplementation((id: number) => {
    return Promise.resolve(mockPhotos.find(photo => photo.id === id));
  }),
  // Add more mock methods as needed
}; 