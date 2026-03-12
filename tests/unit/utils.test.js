/**
 * @jest-environment jsdom
 */

describe('SecurityUtils', () => {
  let SecurityUtils;

  beforeEach(() => {
    // Mock implementation of SecurityUtils
    SecurityUtils = {
      sanitizeText(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
      },

      validateFormInput(input, maxLength = 500) {
        if (!input || typeof input !== 'string') return '';
        return input.trim().slice(0, maxLength);
      },

      validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    };
  });

  describe('sanitizeText', () => {
    test('should escape HTML entities', () => {
      const input = '<script>alert("xss")</script>';
      const result = SecurityUtils.sanitizeText(input);
      expect(result).not.toContain('<script>');
      expect(result).toContain('&lt;script&gt;');
    });

    test('should handle special characters', () => {
      const input = 'Test & "quotes" <tags>';
      const result = SecurityUtils.sanitizeText(input);
      expect(result).toContain('&amp;');
      expect(result).toContain('&quot;');
      expect(result).toContain('&lt;');
    });

    test('should handle normal text without modification', () => {
      const input = 'Normal pet name';
      const result = SecurityUtils.sanitizeText(input);
      expect(result).toBe('Normal pet name');
    });
  });

  describe('validateFormInput', () => {
    test('should trim whitespace', () => {
      const result = SecurityUtils.validateFormInput('  test  ');
      expect(result).toBe('test');
    });

    test('should enforce max length', () => {
      const longString = 'a'.repeat(1000);
      const result = SecurityUtils.validateFormInput(longString, 100);
      expect(result.length).toBe(100);
    });

    test('should return empty string for null/undefined', () => {
      expect(SecurityUtils.validateFormInput(null)).toBe('');
      expect(SecurityUtils.validateFormInput(undefined)).toBe('');
    });

    test('should return empty string for non-string input', () => {
      expect(SecurityUtils.validateFormInput(123)).toBe('');
      expect(SecurityUtils.validateFormInput({})).toBe('');
    });

    test('should handle empty string', () => {
      expect(SecurityUtils.validateFormInput('')).toBe('');
    });
  });

  describe('validateEmail', () => {
    test('should validate correct email format', () => {
      expect(SecurityUtils.validateEmail('test@example.com')).toBe(true);
      expect(SecurityUtils.validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    test('should reject invalid email format', () => {
      expect(SecurityUtils.validateEmail('invalid')).toBe(false);
      expect(SecurityUtils.validateEmail('@example.com')).toBe(false);
      expect(SecurityUtils.validateEmail('test@')).toBe(false);
      expect(SecurityUtils.validateEmail('test@domain')).toBe(false);
    });
  });
});

describe('PerformanceUtils', () => {
  let PerformanceUtils;

  beforeEach(() => {
    jest.useFakeTimers();
    PerformanceUtils = {
      debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }
    };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('debounce', () => {
    test('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = PerformanceUtils.debounce(mockFn, 100);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('should cancel previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = PerformanceUtils.debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});

describe('AccessibilityUtils', () => {
  let AccessibilityUtils;

  beforeEach(() => {
    document.body.innerHTML = '';
    AccessibilityUtils = {
      announceToScreenReader(message, priority = 'polite') {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', priority);
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);

        setTimeout(() => {
          if (announcement.parentNode) {
            document.body.removeChild(announcement);
          }
        }, 1000);
      }
    };
  });

  describe('announceToScreenReader', () => {
    test('should create announcement element', () => {
      AccessibilityUtils.announceToScreenReader('Test message');
      
      const announcement = document.querySelector('[role="status"]');
      expect(announcement).toBeTruthy();
      expect(announcement.textContent).toBe('Test message');
      expect(announcement.getAttribute('aria-live')).toBe('polite');
    });

    test('should use assertive priority when specified', () => {
      AccessibilityUtils.announceToScreenReader('Urgent message', 'assertive');
      
      const announcement = document.querySelector('[role="status"]');
      expect(announcement.getAttribute('aria-live')).toBe('assertive');
    });

    test('should have sr-only class', () => {
      AccessibilityUtils.announceToScreenReader('Test');
      
      const announcement = document.querySelector('[role="status"]');
      expect(announcement.classList.contains('sr-only')).toBe(true);
    });
  });
});
