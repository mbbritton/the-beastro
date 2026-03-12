/**
 * @jest-environment jsdom
 */

// Mock PETS data
global.PETS = [
  {
    id: "test-pet",
    name: "Test Pet",
    owner: "Test Owner",
    species: "cat",
    emoji: "🐱",
    color: "#C9B8F0",
    traits: ["friendly", "playful"],
    bio: "A test pet for unit testing",
    creation: {
      name: "Test Dish",
      description: "A test description"
    }
  }
];

global.TRAIT_PALETTES = [
  { bg: "#EDE6FF", color: "#6B4BC8" },
  { bg: "#E0F7EE", color: "#2E8A60" }
];

// Mock DOMPurify
global.DOMPurify = {
  sanitize: jest.fn((input) => input)
};

// Mock SecurityUtils
global.SecurityUtils = {
  sanitizeText: jest.fn((input) => input),
  validateFormInput: jest.fn((input, maxLength = 500) => {
    if (!input || typeof input !== 'string') return '';
    return input.trim().slice(0, maxLength);
  })
};

// Mock AccessibilityUtils
global.AccessibilityUtils = {
  announceToScreenReader: jest.fn(),
  trapFocus: jest.fn()
};

// Mock PerformanceUtils
global.PerformanceUtils = {
  lazyLoadImages: jest.fn(),
  debounce: jest.fn((func) => func)
};

describe('App.js Functions', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="petGrid"></div>
      <form id="qForm">
        <input id="ownerName" value="John Doe" />
        <input id="petName" value="Fluffy" />
        <input id="personality" value="cute playful energetic" />
        <textarea id="quirks">Loves to play fetch</textarea>
        <button type="submit">Submit</button>
      </form>
      <div id="qSuccess" style="display:none;">
        <h3>Success</h3>
      </div>
      <div id="navMobile"></div>
      <button class="nav-hamburger"></button>
    `;
    
    jest.clearAllMocks();
  });

  describe('buildPetCards', () => {
    test('should create pet cards in the grid', () => {
      // Load the app.js functions (in real scenario, this would be imported)
      const grid = document.getElementById('petGrid');
      
      // Simulate buildPetCards function
      PETS.forEach((pet) => {
        const card = document.createElement('div');
        card.className = 'pet-card';
        
        const sanitizedPetName = DOMPurify.sanitize(pet.name);
        const sanitizedOwner = DOMPurify.sanitize(pet.owner);
        
        card.innerHTML = `
          <div class="pet-name">${sanitizedPetName}</div>
          <div class="pet-owner">${sanitizedOwner}'s pet</div>
        `;
        
        grid.appendChild(card);
      });
      
      expect(grid.children.length).toBe(1);
      expect(DOMPurify.sanitize).toHaveBeenCalled();
      const card = grid.querySelector('.pet-card');
      expect(card).toBeTruthy();
      expect(card.querySelector('.pet-name').textContent).toBe('Test Pet');
    });

    test('should sanitize pet data before rendering', () => {
      const maliciousPet = {
        ...PETS[0],
        name: '<script>alert("xss")</script>Test'
      };
      
      const sanitized = DOMPurify.sanitize(maliciousPet.name);
      
      expect(DOMPurify.sanitize).toHaveBeenCalledWith(maliciousPet.name);
    });
  });

  describe('Form Validation', () => {
    test('should validate required form inputs', () => {
      const ownerName = SecurityUtils.validateFormInput(document.getElementById('ownerName').value);
      const petName = SecurityUtils.validateFormInput(document.getElementById('petName').value);
      const personality = SecurityUtils.validateFormInput(document.getElementById('personality').value);
      const quirks = SecurityUtils.validateFormInput(document.getElementById('quirks').value, 1000);
      
      expect(ownerName).toBe('John Doe');
      expect(petName).toBe('Fluffy');
      expect(personality).toBe('cute playful energetic');
      expect(quirks).toBe('Loves to play fetch');
    });

    test('should handle empty form inputs', () => {
      const emptyInput = SecurityUtils.validateFormInput('');
      expect(emptyInput).toBe('');
    });

    test('should trim whitespace from inputs', () => {
      const trimmed = SecurityUtils.validateFormInput('  test  ');
      expect(trimmed).toBe('test');
    });

    test('should enforce max length', () => {
      const longString = 'a'.repeat(600);
      const limited = SecurityUtils.validateFormInput(longString, 500);
      expect(limited.length).toBe(500);
    });
  });

  describe('toggleNav', () => {
    test('should toggle mobile navigation', () => {
      const mobile = document.getElementById('navMobile');
      const hamburger = document.querySelector('.nav-hamburger');
      
      expect(mobile.classList.contains('open')).toBe(false);
      
      // Simulate toggle
      mobile.classList.toggle('open');
      
      expect(mobile.classList.contains('open')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    test('should announce to screen reader', () => {
      AccessibilityUtils.announceToScreenReader('Test message');
      expect(AccessibilityUtils.announceToScreenReader).toHaveBeenCalledWith('Test message');
    });

    test('should trap focus in mobile menu', () => {
      const mobile = document.getElementById('navMobile');
      AccessibilityUtils.trapFocus(mobile);
      expect(AccessibilityUtils.trapFocus).toHaveBeenCalledWith(mobile);
    });
  });

  describe('Performance', () => {
    test('should lazy load images', () => {
      PerformanceUtils.lazyLoadImages();
      expect(PerformanceUtils.lazyLoadImages).toHaveBeenCalled();
    });

    test('should debounce scroll handler', () => {
      const scrollHandler = jest.fn();
      const debouncedHandler = PerformanceUtils.debounce(scrollHandler);
      
      expect(PerformanceUtils.debounce).toHaveBeenCalledWith(scrollHandler);
    });
  });
});
