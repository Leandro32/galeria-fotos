import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PhotoUpload } from './PhotoUpload';

describe('PhotoUpload', () => {
  const mockOnFilesSelected = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<PhotoUpload onFilesSelected={mockOnFilesSelected} />);
    
    expect(screen.getByText('Arrastrar y soltar fotografías')).toBeInTheDocument();
    expect(screen.getByText('O haz clic para seleccionar archivos')).toBeInTheDocument();
    expect(screen.getByText('Máximo 1000 fotos (JPG, PNG, WEBP)')).toBeInTheDocument();
  });

  it('changes style when dragging over', () => {
    render(<PhotoUpload onFilesSelected={mockOnFilesSelected} />);
    
    const dropzone = screen.getByText('Arrastrar y soltar fotografías').parentElement?.parentElement;
    expect(dropzone).toBeInTheDocument();
    
    if (dropzone) {
      // Initial state
      expect(dropzone.className).not.toContain('border-blue-500');
      
      // Dragging state
      fireEvent.dragOver(dropzone);
      expect(dropzone.className).toContain('border-blue-500');
      
      // Dragging end
      fireEvent.dragLeave(dropzone);
      expect(dropzone.className).not.toContain('border-blue-500');
    }
  });

  it('accepts custom maxFiles value', () => {
    render(<PhotoUpload onFilesSelected={mockOnFilesSelected} maxFiles={50} />);
    expect(screen.getByText('Máximo 50 fotos (JPG, PNG, WEBP)')).toBeInTheDocument();
  });
}); 