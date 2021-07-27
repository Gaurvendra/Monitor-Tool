import React from "react";
import Wave from "react-wavify";
import {useSelector} from 'react-redux';

function Waves({ amplitude, speed, id }) {
    
    const toggleOnOff = useSelector(state => state.backgroundAnimations);
    if(!toggleOnOff) return <></>;
    
    return (
        <div id={id}>
            <Wave
                mask="url(#mask)"
                fill="var(--first)"
                options={{
                    height: 40,
                    amplitude,
                    speed,
                    points: 2,
                }}>
                <defs>
                    <linearGradient
                        id="gradient"
                        gradientTransform="rotate(90)">
                        <stop offset="0" stopColor="white" />
                        <stop offset="0.5" stopColor="black" />
                    </linearGradient>
                    <mask id="mask">
                        <rect
                            x="0"
                            y="0"
                            width="2000"
                            height="300"
                            fill="url(#gradient)"
                        />
                    </mask>
                </defs>
            </Wave>
        </div>
    );
}

export default Waves;
