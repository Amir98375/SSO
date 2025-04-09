import './theme.css';

describe('Theme CSS Variables', () => {
  it('should have all required CSS variables defined', () => {
    // Get all CSS variables from the root element
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    // Check if primary colors are defined
    expect(computedStyle.getPropertyValue('--color-primary')).not.toBe('');
    expect(computedStyle.getPropertyValue('--color-primary-light')).not.toBe('');
    expect(computedStyle.getPropertyValue('--color-primary-dark')).not.toBe('');
    
    // Check if secondary colors are defined
    expect(computedStyle.getPropertyValue('--color-secondary')).not.toBe('');
    expect(computedStyle.getPropertyValue('--color-secondary-light')).not.toBe('');
    expect(computedStyle.getPropertyValue('--color-secondary-dark')).not.toBe('');
    
    // Check if neutral colors are defined
    expect(computedStyle.getPropertyValue('--color-white')).not.toBe('');
    expect(computedStyle.getPropertyValue('--color-black')).not.toBe('');
    expect(computedStyle.getPropertyValue('--color-gray-100')).not.toBe('');
    expect(computedStyle.getPropertyValue('--color-gray-900')).not.toBe('');
    
    // Check if background colors are defined
    expect(computedStyle.getPropertyValue('--bg-primary')).not.toBe('');
    expect(computedStyle.getPropertyValue('--bg-secondary')).not.toBe('');
    expect(computedStyle.getPropertyValue('--bg-tertiary')).not.toBe('');
    
    // Check if text colors are defined
    expect(computedStyle.getPropertyValue('--text-primary')).not.toBe('');
    expect(computedStyle.getPropertyValue('--text-secondary')).not.toBe('');
    expect(computedStyle.getPropertyValue('--text-tertiary')).not.toBe('');
    
    // Check if spacing variables are defined
    expect(computedStyle.getPropertyValue('--spacing-xs')).not.toBe('');
    expect(computedStyle.getPropertyValue('--spacing-sm')).not.toBe('');
    expect(computedStyle.getPropertyValue('--spacing-md')).not.toBe('');
    expect(computedStyle.getPropertyValue('--spacing-lg')).not.toBe('');
    expect(computedStyle.getPropertyValue('--spacing-xl')).not.toBe('');
    
    // Check if border radius variables are defined
    expect(computedStyle.getPropertyValue('--radius-sm')).not.toBe('');
    expect(computedStyle.getPropertyValue('--radius-md')).not.toBe('');
    expect(computedStyle.getPropertyValue('--radius-lg')).not.toBe('');
    
    // Check if typography variables are defined
    expect(computedStyle.getPropertyValue('--font-size-xs')).not.toBe('');
    expect(computedStyle.getPropertyValue('--font-size-sm')).not.toBe('');
    expect(computedStyle.getPropertyValue('--font-size-md')).not.toBe('');
    expect(computedStyle.getPropertyValue('--font-size-lg')).not.toBe('');
    expect(computedStyle.getPropertyValue('--font-size-xl')).not.toBe('');
    
    // Check if font weight variables are defined
    expect(computedStyle.getPropertyValue('--font-weight-light')).not.toBe('');
    expect(computedStyle.getPropertyValue('--font-weight-regular')).not.toBe('');
    expect(computedStyle.getPropertyValue('--font-weight-medium')).not.toBe('');
    expect(computedStyle.getPropertyValue('--font-weight-semibold')).not.toBe('');
    expect(computedStyle.getPropertyValue('--font-weight-bold')).not.toBe('');
    
    // Check if shadow variables are defined
    expect(computedStyle.getPropertyValue('--shadow-sm')).not.toBe('');
    expect(computedStyle.getPropertyValue('--shadow-md')).not.toBe('');
    expect(computedStyle.getPropertyValue('--shadow-lg')).not.toBe('');
    
    // Check if transition variables are defined
    expect(computedStyle.getPropertyValue('--transition-fast')).not.toBe('');
    expect(computedStyle.getPropertyValue('--transition-normal')).not.toBe('');
    expect(computedStyle.getPropertyValue('--transition-slow')).not.toBe('');
  });
}); 