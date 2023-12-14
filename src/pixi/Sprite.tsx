import React, { useState, useEffect } from 'react';
import { Sprite, useTick } from '@pixi/react';

const MySprite = () => {
    const speed = 1;
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [movement, setMovement] = useState({ x: 0, y: 0 });

    const handleKeyDown = (event: any) => {
        switch (event.key) {
            case 'ArrowUp':
                setMovement({ x: 0, y: -speed });
                break;
            case 'ArrowDown':
                setMovement({ x: 0, y: speed });
                break;
            case 'ArrowLeft':
                setMovement({ x: -speed, y: 0 });
                break;
            case 'ArrowRight':
                setMovement({ x: speed, y: 0 });
                break;
            default:
                break;
        }
    };

    const handleKeyUp = () => {
        setMovement({ x: 0, y: 0 });
    };

    useTick((delta) => {
        setPosition(prev => ({
            x: prev.x + movement.x * delta,
            y: prev.y + movement.y * delta
        }));
    });

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return <Sprite  image="https://pixijs.io/pixi-react/img/bunny.png" x={position.x} y={position.y} />;
};

export default MySprite;