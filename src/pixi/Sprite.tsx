import React, { useState, useEffect, useCallback } from 'react';
import { Sprite, useTick } from '@pixi/react';

const MySprite = () => {
    const speed = 3;
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [keys, setKeys] = useState({ up: false, down: false, left: false, right: false});

    const handleKeyDown = useCallback((event: any) => {
        setKeys(prevKeys => {
            switch (event.key) {
                case 'ArrowUp':
                    return { ...prevKeys, up: true };
                case 'ArrowDown':
                    return { ...prevKeys, down: true };
                case 'ArrowLeft':
                    return { ...prevKeys, left: true };
                case 'ArrowRight':
                    return { ...prevKeys, right: true };
                default:
                    return prevKeys;
            }
        });
    }, []);
    
    const handleKeyUp = useCallback((event: any) => {
        setKeys(prevKeys => {
            switch (event.key) {
                case 'ArrowUp':
                    return { ...prevKeys, up: false };
                case 'ArrowDown':
                    return { ...prevKeys, down: false };
                case 'ArrowLeft':
                    return { ...prevKeys, left: false };
                case 'ArrowRight':
                    return { ...prevKeys, right: false };
                default:
                    return prevKeys;
            }
        });
    }, []);

    useTick((delta) => {

        const newY = keys.up && !keys.down ? -speed : (!keys.up && keys.down ? speed : 0)
        const newX = keys.left && !keys.right ? -speed : (!keys.left && keys.right ? speed : 0)


        setPosition(prev => ({
            x: prev.x + newX * delta,
            y: prev.y + newY * delta
        }));
    });

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    return <Sprite  image="https://pixijs.io/pixi-react/img/bunny.png" x={position.x} y={position.y} />;
};

export default MySprite;