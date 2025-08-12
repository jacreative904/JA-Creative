import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    if (!cursor || !dot) return;

    const moveCursor = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      
      // Make cursor visible on first mouse movement
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseOver = (e) => {
      // Check if hovering over a link or button
      const target = e.target;
      const isLink = target.tagName === 'A' || 
                    target.tagName === 'BUTTON' || 
                    target.closest('a') || 
                    target.closest('button') ||
                    target.classList.contains('nav-text') ||
                    target.classList.contains('nav-cta') ||
                    target.classList.contains('button');
      
      setIsHovering(isLink);
      
      // Hide hand cursor on interactive elements
      if (isLink) {
        target.style.cursor = 'none';
        if (target.closest('a')) target.closest('a').style.cursor = 'none';
        if (target.closest('button')) target.closest('button').style.cursor = 'none';
      }
    };

    // Animate cursor with lag
    const animateCursor = () => {
      const dx = mousePosition.current.x - cursorPosition.current.x;
      const dy = mousePosition.current.y - cursorPosition.current.y;
      
      // Add lag by only moving a fraction of the distance
      cursorPosition.current.x += dx * 0.1;
      cursorPosition.current.y += dy * 0.1;
      
      // Update cursor position
      cursor.style.left = cursorPosition.current.x + 'px';
      cursor.style.top = cursorPosition.current.y + 'px';
      
      // Dot follows immediately (no lag)
      dot.style.left = mousePosition.current.x + 'px';
      dot.style.top = mousePosition.current.y + 'px';
      
      requestAnimationFrame(animateCursor);
    };

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    
    // Start animation loop
    animateCursor();

    return () => {
      // Cleanup
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  return (
    <>
      {/* Cursor circle stroke */}
      <div
        ref={cursorRef}
        className="custom-cursor-circle"
        style={{
          position: 'fixed',
          width: isHovering ? '56px' : '32px',
          height: isHovering ? '56px' : '32px',
          border: '2px solid',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s ease, width 0.3s ease, height 0.3s ease',
          opacity: isVisible ? 1 : 0
        }}
      />
      
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s ease',
          opacity: isVisible ? 1 : 0
        }}
      />
    </>
  );
};

export default CustomCursor;
