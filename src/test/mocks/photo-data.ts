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
  {
    id: 2,
    title: 'Test Photo 2',
    description: 'Another test photo',
    url: '/images/test2.jpg',
    location: 'Another Location',
    price: 200,
    size: '20x30',
    date: '2023-01-02',
    photographer: 'Another Photographer',
    hour: '13:00',
    categories: ['portrait'],
    orientation: 'portrait'
  }
]; 