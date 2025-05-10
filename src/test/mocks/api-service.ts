import { vi } from 'vitest';
import { Photo } from '../../types';
import { mockPhotos } from './photo-data';

export const mockApiService = {
  getPhotos: vi.fn().mockResolvedValue(mockPhotos),
  getPhotoById: vi.fn().mockImplementation((id: number) => {
    return Promise.resolve(mockPhotos.find(photo => photo.id === id));
  }),
  searchPhotos: vi.fn().mockImplementation((query: string) => {
    const results = mockPhotos.filter(photo => 
      photo.title.toLowerCase().includes(query.toLowerCase()) ||
      photo.description.toLowerCase().includes(query.toLowerCase())
    );
    return Promise.resolve(results);
  }),
  getPhotosByLocation: vi.fn().mockImplementation((location: string) => {
    const results = mockPhotos.filter(photo => photo.location === location);
    return Promise.resolve(results);
  })
}; 