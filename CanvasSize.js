function adjustCanvasSize() {
            const screenWidth = window.innerWidth;
            const pacman = document.getElementById('pacman');
            const pacman2 = document.getElementById('pacman2');

            if (screenWidth < 768) { // Assuming 768px as a breakpoint for mobile devices
                pacman.width = screenWidth * 0.9; // 90% of screen width
                pacman.height = screenWidth * 0.75 * 0.9; // Maintain aspect ratio based on original 400x320 size
                pacman2.width = screenWidth * 0.9;
                pacman2.height = screenWidth * 0.75 * 0.9; // Adjusted proportionally
            } else {
                pacman.width = 400; // Original size
                pacman.height = 320;
                pacman2.width = 800; // Original size for second canvas
                pacman2.height = 350;
            }
        }

        // Call adjustCanvasSize on load and on window resize
        window.onload = adjustCanvasSize;
        window.onresize = adjustCanvasSize;